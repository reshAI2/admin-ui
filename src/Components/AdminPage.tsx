import React, { useState } from "react";
import { Steps, Upload, Button, Form, Input, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;

export const AdminPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [s3Credentials, setS3Credentials] = useState({ accessKey: "", secretKey: "" });
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [selectedLLM, setSelectedLLM] = useState<string | null>(null);

  const databases = ["PostgreSQL", "MongoDB", "MySQL"];
  const llms = ["GPT-4", "BERT", "LLaMA"];

  // Step 1: File Upload
  const handleFileUpload = (file: File) => {
    setUploadedFiles((prev) => [...prev, file]);
    return false; // Prevent automatic upload
  };

  const handleRemoveFile = (file: File) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
  };

  const next = () => {
    if (currentStep === 0 && uploadedFiles.length === 0) {
      message.error("Загрузите хотя бы один файл!");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => setCurrentStep((prev) => prev - 1);

  // Submission
  const handleFinish = () => {
    console.log("Files:", uploadedFiles);
    console.log("S3 Credentials:", s3Credentials);
    console.log("Database:", selectedDatabase);
    console.log("LLM:", selectedLLM);
    message.success("Данные успешно отправлены!");
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "60px 20px 20px 20px" }}>
      <Steps current={currentStep}>
        <Step title="Загрузка файлов" />
        <Step title="Настройки S3" />
        <Step title="Выбор базы данных" />
        <Step title="Выбор LLM" />
      </Steps>

      <div style={{ marginTop: "20px" }}>
        {currentStep === 0 && (
          <Upload
            multiple
            beforeUpload={handleFileUpload}
            onRemove={handleRemoveFile}
            fileList={uploadedFiles.map((file) => ({
              uid: file.name,
              name: file.name,
              size: file.size,
            }))}
          >
            <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
          </Upload>
        )}

        {currentStep === 1 && (
          <Form layout="vertical">
            <Form.Item label="Access Key" required>
              <Input
                value={s3Credentials.accessKey}
                onChange={(e) =>
                  setS3Credentials((prev) => ({ ...prev, accessKey: e.target.value }))
                }
              />
            </Form.Item>
            <Form.Item label="Secret Key" required>
              <Input.Password
                value={s3Credentials.secretKey}
                onChange={(e) =>
                  setS3Credentials((prev) => ({ ...prev, secretKey: e.target.value }))
                }
              />
            </Form.Item>
          </Form>
        )}

        {currentStep === 2 && (
          <Form layout="vertical">
            <Form.Item label="База данных">
              <Select
                placeholder="Выберите базу данных"
                value={selectedDatabase}
                onChange={(value) => setSelectedDatabase(value)}
              >
                {databases.map((db) => (
                  <Option key={db} value={db}>
                    {db}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}

        {currentStep === 3 && (
          <Form layout="vertical">
            <Form.Item label="LLM">
              <Select
                placeholder="Выберите модель"
                value={selectedLLM}
                onChange={(value) => setSelectedLLM(value)}
              >
                {llms.map((model) => (
                  <Option key={model} value={model}>
                    {model}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        {currentStep > 0 && (
          <Button style={{ marginRight: "10px" }} onClick={prev}>
            Назад
          </Button>
        )}
        {currentStep < 3 && (
          <Button type="primary" onClick={next}>
            Далее
          </Button>
        )}
        {currentStep === 3 && (
          <Button type="primary" onClick={handleFinish}>
            Отправить
          </Button>
        )}
      </div>
    </div>
  );
};
