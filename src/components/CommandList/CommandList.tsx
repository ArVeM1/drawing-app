import { FC } from 'react';
import { Button } from 'antd';
import styles from './CommandList.module.css';

interface ICommandList {
	commands: string[];
	onDeleteCommand: (index: number) => void;
}

const CommandList: FC<ICommandList> = ({ commands, onDeleteCommand }) => {
	const getEmojiForCommand = (command: string): string => {
		const [_, action] = command.split(' ');

		if (!action) return '🧹';

		switch (action.toUpperCase()) {
			case 'RECT':
				return '🔲';
			case 'CIRCLE':
				return '🔴';
			case 'LINE':
				return '➖';
			case 'TRIANGLE':
				return '🔺';
			case 'AREA':
				return '🧹';
			default:
				return '';
		}
	};

	return (
		<div title='Список команд' className={styles.card}>
			<h3 className={styles.title}>Список команд</h3>
			<div className={styles.commandsContainer}>
				{!commands.length && <p className={styles.empty}>Пусто</p>}
				<ul className={styles.command__items}>
					{commands.map((command, index) => (
						<li className={styles.command__item} key={index}>
							<p>
								<strong>{index + 1}.</strong> {getEmojiForCommand(command)}{' '}
								{command}
							</p>
							<Button
								color='danger'
								variant='solid'
								onClick={() => onDeleteCommand(index)}
							>
								Удалить
							</Button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CommandList;
