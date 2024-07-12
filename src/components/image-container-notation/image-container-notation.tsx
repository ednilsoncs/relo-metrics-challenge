import { useState, MouseEvent, useRef, forwardRef, useImperativeHandle } from "react";
import './styles.css'
import { BoundingBoxes } from "../../api/useMutationAnnotationQuery";


export interface ImageContainerNotationRef {
  clean: () => void
}

interface IImageContainerNotation {
  url: string;
  onSelectSquare: (square: BoundingBoxes) => void
}

const ImageContainerNotation = forwardRef<ImageContainerNotationRef, IImageContainerNotation>(({ url, onSelectSquare }, ref) => {
  const [position, setPosition] = useState<BoundingBoxes>({ width: 0, height: 0, topLeftX: 0, topLeftY: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement | null>(null)

  useImperativeHandle(ref,()=> { 
    return { 
      clean(){
        setPosition({
          width: 0,
          height: 0,
          topLeftX: 0,
          topLeftY: 0
        })
      }
    }
  })

  const handleMouseDown = (e: MouseEvent) => {
    setInitialPosition({
      x: e.pageX,
      y: e.pageY,
    });
  }

  const handleMouseUp = (e: MouseEvent) => {
    let topLeftX = 0
    let topLeftY = 0

    const bouncingPosition = imageRef.current?.getBoundingClientRect()
    if (typeof bouncingPosition?.x === "number" && typeof bouncingPosition.y === "number") {
      topLeftY = initialPosition.y - bouncingPosition.y
      topLeftX = initialPosition.x - bouncingPosition.x
    } else {
      return
    }

    if (initialPosition.x > e.pageX) {
      topLeftX = e.pageX - bouncingPosition.x
    }

    if (initialPosition.y > e.pageY) {
      topLeftY = e.pageY - bouncingPosition.y
    }

    const selectedSquare = {
      width: Math.abs(initialPosition.x - e.pageX),
      height: Math.abs(initialPosition.y - e.pageY),
      topLeftX,
      topLeftY,
    }

    onSelectSquare(selectedSquare)


    setPosition(selectedSquare)
  }
  return (
    <div className="image-container" ref={imageRef}>
      <img
        onMouseDown={handleMouseDown}
        onDragEnd={handleMouseUp}
        src={url}
        alt="Placeholder for uploaded image"
      />
      <div className="annotation" style={
        {
          width: `${position.width}px`,
          height: `${position.height}px`,
          top: `${position.topLeftY}px`,
          left: `${position.topLeftX}px`,
        }
      } ></div>
    </div>
  )
})

export default ImageContainerNotation