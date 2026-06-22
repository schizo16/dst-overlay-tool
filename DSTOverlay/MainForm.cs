using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace DSTOverlay;

public class MainForm : Form
{
    private SidecarForm sidecarForm;

    public MainForm()
    {
        Text = "DST Overlay Tool";
        Width = 440;
        Height = 720;
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(20, 20, 30);
        Icon = SystemIcons.Application;
        FormBorderStyle = FormBorderStyle.Sizable;
        MinimumSize = new Size(350, 500);

        string statePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
            "Klei", "DoNotStarveTogether", "DSTOverlay", "game-state.json");

        sidecarForm = new SidecarForm(statePath);
        sidecarForm.TopLevel = false;
        sidecarForm.FormBorderStyle = FormBorderStyle.None;
        sidecarForm.Dock = DockStyle.Fill;
        Controls.Add(sidecarForm);
        sidecarForm.Show();
    }
}
