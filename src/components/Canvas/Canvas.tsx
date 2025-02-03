import { FC, useEffect, useRef } from 'react';
import styles from './Canvas.module.css';
import { shapeHandlers } from './helper';

type ICanvas = {
  commands: string[];
};

const Canvas: FC<ICanvas> = ({ commands }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const executeCanvasCommand = (cmd: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const parts = cmd.trim().split(/\s+/);
      const action = parts[0]?.toUpperCase();

      if (action === 'DRAW') {
        const shape = parts[1]?.toUpperCase();
        const handler = shapeHandlers[shape];

        if (handler) {
          handler(ctx, parts.slice(2));
        } else {
          alert('Unknown shape');
        }
      } else if (action === 'CLEAR') {
        if (parts[1]?.toUpperCase() === 'AREA') {
          const [x, y, width, height] = parts.slice(2);
          ctx.clearRect(
            parseInt(x),
            parseInt(y),
            parseInt(width),
            parseInt(height)
          );
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } else {
        alert('Unknown command');
      }
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (commands.length > 0) {
      commands.forEach((command) => {
        executeCanvasCommand(command);
      });
    }
  }, [commands]);

  return (
    <canvas
      className={styles.container}
      ref={canvasRef}
      width={500}
      height={500}
    />
  );
};

export default Canvas;
