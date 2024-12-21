"use client"
import React from 'react';
import { Card, Form, Input, Button, Select } from 'antd';
import { useAtom } from 'jotai';
import { isVisible, updateEmpolyeeAtom} from '@/jotai/atom';
import axios from '@/api/auth';
  
export interface employees {
    _id: string
    FirstName:string,
    LastName:string,
    DateOfBirth:Date,
    PlaceofBirth:string,
    Rank:string,
    Job:string,
      
  }
    


const EmployeeForm = () => {
    
    const [updates,setUpdates] = useAtom(updateEmpolyeeAtom)
    
    const [form] = Form.useForm();

    const handleSubmit = async (values: employees) => {
        try {
            await axios.post('/employees', values);
            setUpdates(null);
            form.resetFields()

        } catch (error) {
            console.log(error);
        }
    }
    
    const [isShowing, setIsShowingForm] = useAtom(isVisible);

    const handleVisibility = () => {
        setIsShowingForm(!isShowing);
    }
    

    return (
        <Card title="Ajouter un hébergement" style={{ maxWidth: 600, margin: '0 auto', zIndex: 50 }}>
                   {updates ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={async (values) => {
                        try {
                            await axios.put(`/Hauberge/${updates._id}`, values);
                            form.resetFields();
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    initialValues={updates}
                >
                    <Form.Item
                        name="FirstName"
                        label="Prénom"
                        rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="LastName"
                        label="Nom"
                        rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="DateOfBirth"
                        label="Date de naissance"
                        rules={[{ required: true, message: 'Veuillez entrer la date de naissance' }]}
                    >
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item
                        name="PlaceofBirth"
                        label="Lieu de naissance"
                        rules={[{ required: true, message: 'Veuillez entrer le lieu de naissance' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Rank"
                        label="Grade"
                        rules={[{ required: true, message: 'Veuillez sélectionner le grade' }]}
                    >
                        <Select>
                            <Select.Option value="Junior">Junior</Select.Option>
                            <Select.Option value="Senior">Senior</Select.Option>
                            <Select.Option value="Manager">Manager</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="Job"
                        label="Poste"
                        rules={[{ required: true, message: 'Veuillez entrer le poste' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Mettre à jour
                        </Button>
                    </Form.Item>
                </Form>
            )
            : (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="FirstName"
                        label="Prénom"
                        rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="LastName"
                        label="Nom"
                        rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="DateOfBirth"
                        label="Date de naissance"
                        rules={[{ required: true, message: 'Veuillez entrer la date de naissance' }]}
                    >
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item
                        name="PlaceofBirth"
                        label="Lieu de naissance"
                        rules={[{ required: true, message: 'Veuillez entrer le lieu de naissance' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Rank"
                        label="Grade"
                        rules={[{ required: true, message: 'Veuillez sélectionner le grade' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Job"
                        label="Poste"
                        rules={[{ required: true, message: 'Veuillez entrer le poste' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Ajouter l&apos;employé
                        </Button>
                    </Form.Item>
                </Form>
    
            )
            
            }
            <Button type="link" onClick={handleVisibility} block>
                Terminer
            </Button>
        </Card>
    );
}


export default EmployeeForm;