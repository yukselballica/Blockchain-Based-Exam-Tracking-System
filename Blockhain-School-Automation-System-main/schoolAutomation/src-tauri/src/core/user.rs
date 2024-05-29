use reqwest::{self, Error};
use rust_fetch::Fetch;

#[tauri::command]
pub async fn test(name: String) -> Result<String, ()> {
    let res = get().await;
    match res {
        Ok(response) => Ok(response),
        Err(_) => Err(()),
    }
}

async fn get() -> Result<String, Error> {
    let resp = reqwest::get("http://httpbin.org/ip").await?;
    let body = resp.text().await?;
    println!("{}", body);
    Ok(body)
}
