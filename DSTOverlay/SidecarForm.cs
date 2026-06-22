using System;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Windows.Forms;
using Microsoft.Web.WebView2.WinForms;

namespace DSTOverlay;

public class SidecarForm : Form
{
    private WebView2 webView;
    private FileSystemWatcher watcher;
    private string statePath;

    public SidecarForm(string statePath)
    {
        this.statePath = statePath;
        Text = "DST Overlay — Sidecar";
        Width = 440;
        Height = 700;
        StartPosition = FormStartPosition.Manual;
        Location = new Point(50, 50);
        BackColor = Color.FromArgb(20, 20, 30);
        Icon = SystemIcons.Application;

        webView = new WebView2 { Dock = DockStyle.Fill };
        Controls.Add(webView);
        webView.EnsureCoreWebView2Async().ContinueWith(_ =>
        {
            webView.CoreWebView2.Settings.IsWebMessageEnabled = true;
            string dir = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "wwwroot");
            webView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "dst.local", dir, Microsoft.Web.WebView2.Core.CoreWebView2HostResourceAccessKind.Allow);
            webView.CoreWebView2.Navigate("https://dst.local/index.html");
        }, System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext());

        SetupWatcher();
    }

    private void SetupWatcher()
    {
        string dir = Path.GetDirectoryName(statePath);
        if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
        watcher = new FileSystemWatcher
        {
            Path = dir,
            Filter = Path.GetFileName(statePath),
            NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.Size
        };
        watcher.Changed += OnStateFileChanged;
        watcher.Created += OnStateFileChanged;
        watcher.EnableRaisingEvents = true;
    }

    private void OnStateFileChanged(object sender, FileSystemEventArgs e)
    {
        try
        {
            string json = File.ReadAllText(statePath);
            webView.CoreWebView2.PostWebMessageAsString(json);
        }
        catch { }
    }
}
