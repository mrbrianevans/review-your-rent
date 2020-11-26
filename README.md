# ![Icon](documentation/icon.png) Review Your Rent
This is a website for students to review their private accommodation

## Tech specs
Hosted by Firebase

Cloud functions written in TypeScript

Client written in ReactJS TypeScript

[Database doc](documentation/database.md)

## Folder structure
- root
    - functions
        - src
        - lib
    - public
        - media
        - scripts
        - static-pages
        - styling
    - frontend
        - scripts
            - components
            - media
            - pages
            - types
            - index.tsx
        
Front end source code is written in `frontend` and compiled to `public`
Back end source code is written in `functions/src` and compiled to `functions/lib`
