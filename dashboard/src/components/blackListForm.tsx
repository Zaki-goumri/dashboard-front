"use client"
import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useAtom } from 'jotai';
import { isVisible} from '@/lib/atom';
import axios from '@/api/auth';





interface AdddReservationsForm {
    userId:string,
    Reason:string,
    Hobberge:string
}

const AddBlackList = () => {
        
    const [form] = Form.useForm();

    const handleSubmit = async (values: AdddReservationsForm) => {
        try {
            await axios.post('/reservation', values);
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
               
            
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >

                    <Form.Item
                        name="Reason"
                        label="Reason"
                        rules={[{ required: true, message: 'Please enter the reason' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="Hobberge"
                        label="Hébergement"
                        rules={[{ required: true, message: 'Please select hébergement' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="userId"
                        label="User Id"
                        rules={[{ required: true, message: 'Please enter user id' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
    

            <Button type="link" onClick={handleVisibility} block>
                Terminer
            </Button>
        </Card>
    );
}


export default AddBlackList;