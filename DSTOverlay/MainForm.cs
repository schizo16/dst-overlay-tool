using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace DSTOverlay;

public class MainForm : Form
{
    private NotifyIcon trayIcon;
    private ContextMenuStrip trayMenu;
    private OverlayForm overlayForm;
    private SidecarForm sidecarForm;
    private bool sidecarVisible = false;
    private static string statePath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
        "Klei", "DoNotStarveTogether", "DSTOverlay", "game-state.json");

    public MainForm()
    {
        WindowState = FormWindowState.Minimized;
        ShowInTaskbar = false;

        overlayForm = new OverlayForm(statePath);
        sidecarForm = new SidecarForm(statePath);
        overlayForm.Show();

        trayMenu = new ContextMenuStrip();
        trayMenu.Items.Add("Toggle Sidecar", null, (_, _) => ToggleSidecar());
        trayMenu.Items.Add(new ToolStripSeparator());
        trayMenu.Items.Add("Exit", null, (_, _) => ExitApp());

        trayIcon = new NotifyIcon
        {
            Icon = SystemIcons.Application,
            ContextMenuStrip = trayMenu,
            Text = "DST Overlay",
            Visible = true
        };
    }

    private void ToggleSidecar()
    {
        sidecarVisible = !sidecarVisible;
        if (sidecarVisible)
        {
            sidecarForm.Show();
            overlayForm.Hide();
        }
        else
        {
            sidecarForm.Hide();
            overlayForm.Show();
        }
    }

    private void ExitApp()
    {
        trayIcon.Visible = false;
        Application.Exit();
    }
}
