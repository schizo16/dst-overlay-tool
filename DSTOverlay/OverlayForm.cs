using System;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Microsoft.Web.WebView2.WinForms;

namespace DSTOverlay;

public class OverlayForm : Form
{
    private WebView2 webView;
    private FileSystemWatcher watcher;
    private string statePath;

    [DllImport("user32.dll")]
    private static extern int SendMessage(IntPtr hWnd, int Msg, int wParam, int lParam);
    [DllImport("user32.dll")]
    private static extern bool ReleaseCapture();

    private const int WM_NCLBUTTONDOWN = 0xA1;
    private const int HTCAPTION = 0x2;

    private void DragMove()
    {
        ReleaseCapture();
        SendMessage(Handle, WM_NCLBUTTONDOWN, HTCAPTION, 0);
    }

    public OverlayForm(string statePath)
    {
        this.statePath = statePath;
        FormBorderStyle = FormBorderStyle.None;
        TopMost = true;
        ShowInTaskbar = false;
        Width = 420;
        Height = 620;
        Location = new Point(
            Screen.PrimaryScreen.WorkingArea.Width - Width - 10,
            10
        );
        BackColor = Color.FromArgb(15, 15, 25);
        MouseDown += (_, _) => DragMove();

        webView = new WebView2 { Dock = DockStyle.Fill };
        Controls.Add(webView);
        webView.EnsureCoreWebView2Async().ContinueWith(_ =>
        {
            webView.CoreWebView2.Settings.IsWebMessageEnabled = true;
            webView.CoreWebView2.WebMessageReceived += (_, args) =>
            {
                if (args.TryGetWebMessageAsString() == "drag")
                    DragMove();
            };
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
