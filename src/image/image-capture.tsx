import "../dynamsoft.config";
import { ChangeEvent, useRef, useEffect } from "react";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

import './image-capture.css';

const ImageCapture = () => {
  const componentUnmounted = useRef<boolean>(false);
  const resultsContainer = useRef<HTMLDivElement>(null);
  const caVisionRouter = useRef<Promise<CaptureVisionRouter> | null>(null);

  const captureImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (resultsContainer.current) {
      resultsContainer.current.innerText = "";
    }

    try {
      // create captureVisionRouter instance
      const cvRouter = await (caVisionRouter.current = 
        caVisionRouter.current || CaptureVisionRouter.createInstance()
      );

      for (const file of files) {
        // decode selected image with 'ReadBarcodes_SpeedFirst' template.

        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");

        if (files.length > 1 && resultsContainer.current) {
          resultsContainer.current.innerText += `\n${file.name}:\n`;
        }
        for (const _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
          const item = _item as BarcodeResultItem;
          if (resultsContainer.current) {
            resultsContainer.current.innerText += item.text + "\n";
          }
        }
        if (!result.items.length && resultsContainer.current) {
          resultsContainer.current.innerText += 'No barcode found\n';
        }
      }
    } catch (ex: any) {
      const errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  };

  useEffect(() => {
    return () => {
      componentUnmounted.current = true;
      if (caVisionRouter.current) {
        caVisionRouter.current.then((router) => router.dispose()).catch(() => {});
      }
    };
  }, []);

  return (
    <div className="capture-img">
      <p> Detect barcodes from images or image files on your device </p>
      <div className="img-ipt">
        <input
          type="file"
          multiple
          onChange={captureImage}
          accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
        />
      </div>
      <h4>Results:</h4>
      <div className="result-area" ref={resultsContainer} />
    </div>
  );
};

export default ImageCapture;
