import { useState, FC } from 'react';
import CommandInput from './components/CommandInput/CommandInput';
import Canvas from './components/Canvas/Canvas';
import styles from './App.module.css';
import CommandList from './components/CommandList/CommandList';
import { Button, Space } from 'antd';
import { Col, Row } from 'antd';
import Header from './components/Header/Header';

const App: FC = () => {
  const [commands, setCommands] = useState<string[]>([]);

  const handleExecute = (command: string) => {
    setCommands([...commands, command]);
  };

  const handleDeleteCommand = (index: number) => {
    const newCommands = commands.filter((_, i) => i !== index);
    setCommands(newCommands);
  };

  const onClearCanvas = () => {
    setCommands([...commands, 'CLEAR']);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>

      <div className={styles.container}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Canvas commands={commands} />
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <CommandList
              commands={commands}
              onDeleteCommand={handleDeleteCommand}
            />
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Space.Compact>
              <CommandInput onExecute={handleExecute} />
              <Button
                color="danger"
                variant="solid"
                className={styles.button__clear}
                onClick={onClearCanvas}
              >
                Очистить
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default App;
