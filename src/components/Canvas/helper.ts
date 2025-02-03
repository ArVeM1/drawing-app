
export const shapeHandlers: Record<string, (ctx: CanvasRenderingContext2D, args: string[]) => void> = {
	TEXT: (ctx, args) => {
		const [x, y, ...textParts] = args;
		const text = textParts.slice(0, -1).join(' ').replace(/'/g, '');
		const color = textParts[textParts.length - 1];
		ctx.fillStyle = color || 'black';
		ctx.font = '20px Arial';
		ctx.fillText(text, parseInt(x), parseInt(y));
	},
	TRIANGLE: (ctx, args) => {
		const [x1, y1, x2, y2, x3, y3, color] = args;
		ctx.beginPath();
		ctx.moveTo(parseInt(x1), parseInt(y1));
		ctx.lineTo(parseInt(x2), parseInt(y2));
		ctx.lineTo(parseInt(x3), parseInt(y3));
		ctx.closePath();
		ctx.fillStyle = color || 'black';
		ctx.fill();
		ctx.strokeStyle = color || 'black';
		ctx.stroke();
	},
	LINE: (ctx, args) => {
		const [x1, y1, x2, y2, color] = args;
		ctx.strokeStyle = color || 'black';
		ctx.beginPath();
		ctx.moveTo(parseInt(x1), parseInt(y1));
		ctx.lineTo(parseInt(x2), parseInt(y2));
		ctx.stroke();
	},
	RECT: (ctx, args) => {
		const [x, y, width, height, color] = args;
		ctx.fillStyle = color || 'black';
		ctx.fillRect(parseInt(x), parseInt(y), parseInt(width), parseInt(height));
	},
	CIRCLE: (ctx, args) => {
		if (args.length === 0) {
			alert(
				'Нужно добавить x, y, radius и цвет по желанию. Например, draw circle 100 100 10 red'
			);
			return;
		}
		const [x, y, radius, color] = args;
		ctx.beginPath();
		ctx.arc(parseInt(x), parseInt(y), parseInt(radius), 0, Math.PI * 2);
		ctx.fillStyle = color || 'black';
		ctx.fill();
	},
};