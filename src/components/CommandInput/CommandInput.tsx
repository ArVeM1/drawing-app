import {FC, useState} from 'react';
import styles from './CommandInput.module.css'
import { Input } from 'antd';

interface ICommandInput {
	onExecute: (command: string) => void
}

const CommandInput: FC<ICommandInput> = ({ onExecute }) => {
	const [command, setCommand] = useState<string>('');

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onExecute(command);
      setCommand('');
    }
  };
	
	return (
		<Input 
			className={styles.input} 
			type="text"
      value={command}
      onChange={(e) => setCommand(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="draw ..."
		/>
	);
};

export default CommandInput;