import { FC, useEffect, useRef } from 'react';
import { shapeAction } from './Canvas.interface';
import styles from './Canvas.module.css';

interface ICanvas {
  commands: string[];
  onDeleteCommand: (index: number) => void;
}

const Canvas: FC<ICanvas> = ({ commands, onDeleteCommand }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const executeCanvasCommand = (cmd: string) => {
    let status: number = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parts = cmd.trim().split(/\s+/);
    const action = parts[0]?.toUpperCase();

    if (action === 'DRAW') {
      const shape = parts[1]?.toUpperCase() as shapeAction;

      switch (shape) {
        case 'TEXT': {
          const [x, y, ...textParts] = parts.slice(2);
          const text = textParts.slice(0, -1).join(' ').replace(/'/g, '');
          const color = textParts[textParts.length - 1];
          ctx.fillStyle = color || 'black';
          ctx.font = '20px Arial';
          ctx.fillText(text, parseInt(x), parseInt(y));
          status = 1;
          break;
        }
        case 'TRIANGLE': {
          const [x1, y1, x2, y2, x3, y3, color] = parts.slice(2);
          ctx.beginPath();
          ctx.moveTo(parseInt(x1), parseInt(y1));
          ctx.lineTo(parseInt(x2), parseInt(y2));
          ctx.lineTo(parseInt(x3), parseInt(y3));
          ctx.closePath();
          ctx.fillStyle = color || 'black';
          ctx.fill();
          ctx.strokeStyle = color || 'black';
          ctx.stroke();
          status = 1;
          break;
        }
        case 'LINE': {
          const [x1, y1, x2, y2, color] = parts.slice(2);
          ctx.strokeStyle = color || 'black';
          ctx.beginPath();
          ctx.moveTo(parseInt(x1), parseInt(y1));
          ctx.lineTo(parseInt(x2), parseInt(y2));
          ctx.stroke();
          status = 1;
          break;
        }
        case 'RECT': {
          const [x, y, width, height, color] = parts.slice(2);
          ctx.fillStyle = color || 'black';
          ctx.fillRect(
            parseInt(x),
            parseInt(y),
            parseInt(width),
            parseInt(height)
          );
          status = 1;
          break;
        }
        case 'CIRCLE': {
          if (parts.slice(2).length === 0) {
            alert(
              'Нужно добавить x, y, radius и цвет по желанию. Например, draw circle 100 100 10 red'
            );
          }
          const [x, y, radius, color] = parts.slice(2);
          ctx.beginPath();
          ctx.arc(parseInt(x), parseInt(y), parseInt(radius), 0, Math.PI * 2);
          ctx.fillStyle = color || 'black';
          ctx.fill();
          status = 1;
          break;
        }
        default: {
          alert('Unknown command');
          break;
        }
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
        status = 1;
        return;
      }
      status = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      alert('Unknown command');
    }

    if (status === 0) {
      onDeleteCommand(commands.length - 1);
    }
  };

  useEffect(() => {
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
  }, [commands, executeCanvasCommand]);

  return <canvas className={styles.container} ref={canvasRef} />;
};

export default Canvas;
