"use client"
import React from 'react';
import { Card, Form, Input, Button, Select, Switch } from 'antd';
import { useAtom } from 'jotai';
import { isVisible, updateHousingAtom } from '@/lib/atom';
import axios from '@/api/auth';
interface AddHebergementFormProps {
    type: string,
    capacity: number,
    name: string,
    location: {
      latitude: number,
      longitude: number
    },
    address: string,
    email: string,
    phone: string,
    avalaiblity: boolean,
    PersonReservedNbr: number,
    rating: number,
    prix: number,
    Offres: string[],
    pricePerNight: number
    
}

const AddHebergementForm = () => {
    
    const [updates,setUpdates] = useAtom(updateHousingAtom)
    
    const [form] = Form.useForm();

    const handleSubmit = async (values: AddHebergementFormProps) => {
        try {
            await axios.post('/Hauberge', values);
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
                        name="name"
                        label="Nom de l'hébergement"
                        rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Type d'hébergement" 
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="Hotel">Hôtel</Select.Option>
                            <Select.Option value="camp">Camp</Select.Option>
                            <Select.Option value="maison">Maison</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="address" label="Adresse" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="phone" label="Téléphone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="capacity" label="Capacité" rules={[{ required: true }]}>
                        <Input type="number" min={1} />
                    </Form.Item>

                    <Form.Item name="pricePerNight" label="Prix par nuit" rules={[{ required: true }]}>
                        <Input type="number" min={0} />
                    </Form.Item>

                    <Form.Item name="Offres" label="Offres disponibles">
                        <Select mode="tags" />
                    </Form.Item>

                    <Form.Item name="avalaiblity" valuePropName="checked">
                        <Switch checkedChildren="Disponible" unCheckedChildren="Non disponible" />
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
                    name="name"
                    label="Nom de l'hébergement"
                    rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type d'hébergement"
                    rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
                >
                    <Select>
                        <Select.Option value="Hotel">Hôtel</Select.Option>
                        <Select.Option value="camp">Camp</Select.Option>
                        <Select.Option value="maison">maison</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Adresse"
                    rules={[{ required: true, message: 'Veuillez entrer l\'adresse' }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="PersonReservedNbr"
                    label="Nombre de personnes réservées"
                    rules={[{ required: true, message: 'Veuillez entrer le nombre de personnes' }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Coordonnées GPS"
                    rules={[{ required: true, message: 'Veuillez entrer les coordonnées GPS' }]}
                >
                    <Input.Group>
                        <Input
                            style={{ width: '50%' }}
                            placeholder="Latitude"
                            onChange={(e) => form.setFieldsValue({
                                location: {
                                    latitude: parseFloat(e.target.value)
                                }
                            })}
                        />
                        <Input
                            style={{ width: '50%' }}
                            placeholder="Longitude"
                            onChange={(e) => form.setFieldsValue({
                                location: {
                                    longitude: parseFloat(e.target.value)
                                }
                            })}
                        />
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Veuillez entrer l\'email' },
                        { type: 'email', message: 'Veuillez entrer un email valide' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Téléphone"
                    rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="capacity"
                    label="Capacité (personnes)"
                    rules={[{ required: true, message: 'Veuillez entrer la capacité' }]}
                >
                    <Input type="number" min={1} />
                </Form.Item>

                <Form.Item
                    name="pricePerNight"
                    label="Prix par nuit"
                    rules={[{ required: true, message: 'Veuillez entrer le prix' }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>

                <Form.Item
                    name="Offres"
                    label="Offres disponibles"
                >
                    <Select mode="tags" placeholder="Ajouter des offres">
                    </Select>
                </Form.Item>

                <Form.Item
                    name="avalaiblity"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch checkedChildren="Disponible" unCheckedChildren="Non disponible" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Ajouter l&apos;hébergement
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


export default AddHebergementForm;