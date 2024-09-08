import "../dynamsoft.config";
import { useEffect, useState, useRef } from "react";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";

import "./video-capture.css";

const VideoCapture = () => {
  const componentUnmounted = useRef<boolean>(false);
  const videoContainer = useRef<HTMLDivElement>(null);
  const resultsContainer = useRef<HTMLDivElement>(null);
  const cameraEnhancer = useRef<CameraEnhancer | null>(null);
  const caVisionRouter = useRef<CaptureVisionRouter | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  // Initialize camera
  const initializeVideoCapture = async () => {
    if (cameraEnhancer.current && caVisionRouter.current) 
      return; // Avoid re-initialization

    try {
      // create camera view and enhancer
      const cameraView = await CameraView.createInstance();
      cameraEnhancer.current = await CameraEnhancer.createInstance(cameraView);

      // remove the first dormant UI element, if any
      if (videoContainer.current) {
        if (videoContainer.current.firstChild) 
          videoContainer.current.removeChild(videoContainer.current.firstChild);
        // append the working camera view
        videoContainer.current.appendChild(cameraView.getUIElement());
      }

      // create CaptureVisionRouter instance
      caVisionRouter.current = await CaptureVisionRouter.createInstance();
      caVisionRouter.current.setInput(cameraEnhancer.current);

      // add result receiver for decoding barcodes
      caVisionRouter.current.addResultReceiver({
        onDecodedBarcodesReceived: (result) => handleDecodedBarcodes(result),
      });

      // configure barcode filter
      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await caVisionRouter.current.addResultFilter(filter);
    } catch (ex: any) {
      handleError(ex);
    }
  };

  // handle barcode decoding results
  const handleDecodedBarcodes = (result: any) => {
    if (!result.barcodeResultItems.length) return;
    resultsContainer.current!.textContent = '';
    for (let item of result.barcodeResultItems) {
      resultsContainer.current?.append(
        `${item.formatString}: ${item.text}`,
        document.createElement('hr')
      );
    }
  };

  // error handling function
  const handleError = (ex: any) => {
    const errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  };

  const toggleCamera = async () => {
    try {
      if (cameraActive) {
        await caVisionRouter.current?.stopCapturing();
        await cameraEnhancer.current?.close();
      } else {
        if (!caVisionRouter.current || !cameraEnhancer.current) {
          await initializeVideoCapture();
        }
        await cameraEnhancer.current?.open();
        await caVisionRouter.current?.startCapturing("ReadSingleBarcode");
      }
      setCameraActive(!cameraActive);
    } catch (ex: any) {
      handleError(ex);
    }
  };

  // Initialize on mount, & cleanup on unmount
  useEffect(() => {
    initializeVideoCapture();
    
    return () => {
      componentUnmounted.current = true;
      (async () => {
        try {
          await caVisionRouter.current?.dispose();
          await cameraEnhancer.current?.dispose();
        } catch (_) {}
      })();
    };
  }, []);

  return (
    <div className="vid-container">
      <div className="vid-text">
        <p> Detect barcodes from your device camera feed </p>
      </div>
      <button 
        className="cam-btn" 
        onClick={toggleCamera}
      >
        {cameraActive ? "Stop Camera" : "Start Camera"}
      </button>
      <div ref={videoContainer} className="cam-container"/>
      <h4>Results:</h4>
      <div ref={resultsContainer} />
    </div>
  );
};

export default VideoCapture;
