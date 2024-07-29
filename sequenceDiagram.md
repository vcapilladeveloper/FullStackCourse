Here is a simple flow chart:

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: App already loaded
    Note right of browser: User writes somethin into the text field and click on Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message": "note created"}
    deactivate server
    Note right of browser: New item added to the list
```