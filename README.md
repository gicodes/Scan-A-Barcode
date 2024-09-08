# SCAN-A-BARCODE

## Overview

    This React application allows users to scan barcodes using either their device's camera in real-time or by selecting images containing barcodes from their device storage. The app consists of two main components:

- `VideoCapture` for live video scanning.
- `ImageCapture` for scanning barcodes from images.


## Table of Contents

1. Setup and Installation

2. Component Breakdown
    1. VideoCapture Component
    2. ImageCapture Component
    3. App Component

3. Configuration
    - dynamsoft config
    - .env file

4. How to Use

5. Error Handling

6. Dependencies

7. Conclusion


## Setup and Installation
1. Clone the Repository
    git clone https://github.com/gicodes/scan-a-barcode && cd scan-a-barcode

2. Install Dependencies
    npm install

3. Create the .env File: Create a .env file in the root directory and add your Dynamsoft license key:
    `REACT_APP_DYNAMSOFT_LICENSE_KEY=YOUR_DYNAMSOFT_LICENSE_KEY`

4. Start the Application
    `npm start`
    The app will be accessible on `http://localhost:3000`
    

## Component Breakdown

1. VideoCapture Component: `src/video/video-capture.tsx`
    This component enables real-time barcode scanning using the device's camera.

    ### Key Functions:

    **initializeVideoCapture** initializes the camera and barcode scanning functionality using dynamsoft-camera-enhancer and dynamsoft-capture-vision-router.

    **handleDecodedBarcodes** processes and displays the decoded barcode results.

    **toggleCamera** toggles the camera on or off, based on user interaction.

    **Error Handling** handles errors such as initialization failures or decoding issues are caught and displayed to the user.

    **UI Elements:**
    - Button to start/stop the camera.
    - Display Container area for the camera feed.
    - Results Area section that shows decoded barcode information.

2. ImageCapture Component: `src/image/image-capture.tsx`
    This component allows users to upload images from their device for barcode detection.

    ### Key Functions:

    **captureImage** handles the file input change event, initializes the barcode scanning process, and displays results.

    **Error Handling** catches and handles errors related to image decoding or processing.
    
    **UI Elements:**
    - File input to select multiple images.
    - Results Area to display decoded barcode information.

3. App Component: `src/App.tsx`
    The main application component that manages the UI and allows users to switch between video capture and image capture modes.

    #### Key Functions:

    **handleVideoChange** activates the video capture mode.

    **handleImageChange** activates the image capture mode.

    **UI Elements:**
    - Header with buttons to toggle between video and image capture modes.
    - Conditional rendering of VideoCapture or ImageCapture components based on the user's choice.


## Configuration
    
1. Create or copy a file named `dynamsoft.config.js` in the src directory. This file is responsible for setting up the Dynamsoft license and configuring module paths

2. Make sure to create a .env file in your root directory and add your Dynamsoft license key;
    REACT_APP_DYNAMSOFT_LICENSE_KEY='YOUR_DYNAMSOFT_LICENSE_KEY'

    Replace YOUR_DYNAMSOFT_LICENSE_KEY with the actual license key obtained from Dynamsoft's License Center.


## How To Use

1. Start the Application (I've already stated how to run this app).

2. Select the Capture Mode:
    - Click "Video Capture" to start the camera and scan barcodes in real-time.
    - Click "Image Capture" to select images from your device for barcode scanning.

3. View Results: The decoded barcode results will be displayed under the "Results" section in each mode.


## Error Handling

    Both components (VideoCapture and ImageCapture) have error-handling mechanisms to:
        - Catch exceptions during initialization or processing.
        - Display errors to the user using alerts and console messages.


## Dependencies

- `dynamsoft-camera-enhancer`: For accessing and managing the camera feed.
- `dynamsoft-capture-vision-router`: For barcode detection and processing.
- `dynamsoft-core`: Core utilities required for barcode scanning.

Make sure to install these dependencies by running:
    `npm install dynamsoft-camera-enhancer dynamsoft-capture-vision-router dynamsoft-core`


## Conclusion

    This application provides a flexible and efficient way to scan barcodes either through real-time camera feeds or by processing static images. The modular design allows easy extension and integration with additional features, such as support for more barcode types or enhanced user interface elements.