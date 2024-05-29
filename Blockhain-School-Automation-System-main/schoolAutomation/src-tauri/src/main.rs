// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod core;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            app.get_window("main").unwrap();
            tauri::WindowBuilder::new(
                &handle,
                "menu",
                tauri::WindowUrl::App("assets/menu-panel/menu.html".into()),
            )
            .visible(false)
            .build();
            tauri::WindowBuilder::new(
                &handle,
                "studentMenu",
                tauri::WindowUrl::App("assets/menu-panel/studentMenu.html".into()),
            )
            .visible(false)
            .build();
            tauri::WindowBuilder::new(
                &handle,
                "classAdd",
                tauri::WindowUrl::App("assets/academy-control-panel/kontrol_paneli.html".into()),
            )
            .visible(false)
            .build();
            tauri::WindowBuilder::new(
                &handle,
                "tableList",
                tauri::WindowUrl::App("assets/table-list/shuffle.html".into()),
            )
            .visible(false)
            .build();

            tauri::WindowBuilder::new(
                &handle,
                "studentList",
                tauri::WindowUrl::App("assets/student-control-panel/student-control-panel.html".into()),
            )
            .visible(false)
            .build();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![core::user::test])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
