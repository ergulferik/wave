# WebSocket Mouse Tracker

This project tracks mouse movements and clicks on the page in real-time using NestJS for the backend and Angular for the frontend. The data is transmitted using WebSocket to update the UI with the mouse position and clicks instantly.

## Features

- **Real-time Mouse Movements:** Tracks the mouse movement on the page and shows it instantly.
- **Mouse Clicks:** Tracks and displays mouse clicks in real-time.
- **WebSocket Communication:** Data is sent and received between the NestJS backend and the Angular frontend using WebSockets.


## Technologies

- **Backend:**
  - [NestJS](https://nestjs.com/) - For the WebSocket server and API
- **Frontend:**
  - [Angular](https://angular.io/) - For building the dynamic user interface

## Setup

### 1. Backend Setup (NestJS)

1. Go to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

2. Start the NestJS server:
    ```bash
    npm run start
    ```

The backend will run on `http://localhost:3000`.

### 2. Frontend Setup (Angular)

1. Go to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the Angular app:
    ```bash
    ng serve
    ```

The frontend will run on `http://localhost:4200`.

## Usage

1. With both servers running, open the Angular app in your browser.
2. You will see your mouse movements and clicks being tracked on the page.
3. All movements and clicks are sent to the backend via WebSocket and displayed in real-time.

## Contributing

To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -am 'Add new feature'
    ```
4. Push the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
