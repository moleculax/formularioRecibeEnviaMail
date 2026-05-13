'use client';

import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SiN8N } from "react-icons/si";

interface FormData {
    nombre_completo: string;
    email: string;
    asunto: string;
    comentario: string;
}

export default function ContactosN8NComponent() {
    const [formData, setFormData] = useState<FormData>({
        nombre_completo: '',
        email: '',
        asunto: '',
        comentario: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.nombre_completo.trim()) {
            newErrors.nombre_completo = 'Por favor ingresa tu nombre completo.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Por favor ingresa un correo válido.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Por favor ingresa un correo electrónico válido.';
        }

        if (!formData.asunto.trim()) {
            newErrors.asunto = 'Por favor ingresa el asunto.';
        }

        if (!formData.comentario.trim()) {
            newErrors.comentario = 'Por favor escribe tu comentario.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://TU_URL/webhook/contactos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({
                    nombre_completo: '',
                    email: '',
                    asunto: '',
                    comentario: '',
                });
                // Ocultar mensaje de éxito después de 5 segundos
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                alert('Hubo un error al enviar el formulario.');
            }
        } catch (error) {
            alert('Error de conexión: ' + (error instanceof Error ? error.message : 'Error desconocido'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="card-header bg-gradient bg-primary text-white text-center py-4 border-0">
                            <div className="mb-2">
                                <SiN8N size={40} className="text-white opacity-75" />
                            </div>
                            <h3 className="mb-1 fw-semibold">Escribanos</h3>
                            <p className="mb-0 small opacity-75">Complete el formulario y le responderemos a la brevedad</p>
                        </div>

                        <div className="card-body p-4 p-lg-5 bg-white">
                            {showSuccess && (
                                <div className="alert alert-success border-0 rounded-3 shadow-sm fade show" role="alert">
                                    <div className="d-flex align-items-center">
                                        <svg className="bi flex-shrink-0 me-2" width="20" height="20" role="img" aria-label="Success:">
                                            <use xlinkHref="#check-circle-fill" />
                                        </svg>
                                        <div>
                                            <strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto pronto.
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-4">
                                    <label htmlFor="nombre_completo" className="form-label fw-semibold text-secondary">
                                        Nombre completo <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg rounded-3 ${errors.nombre_completo ? 'is-invalid' : ''}`}
                                        id="nombre_completo"
                                        name="nombre_completo"
                                        placeholder="Ej: Juan Pérez"
                                        value={formData.nombre_completo}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.nombre_completo && (
                                        <div className="invalid-feedback d-block">{errors.nombre_completo}</div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-semibold text-secondary">
                                        Correo electrónico <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control form-control-lg rounded-3 ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        placeholder="ejemplo@correo.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="asunto" className="form-label fw-semibold text-secondary">
                                        Asunto <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg rounded-3 ${errors.asunto ? 'is-invalid' : ''}`}
                                        id="asunto"
                                        name="asunto"
                                        placeholder="¿En qué podemos ayudarle?"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.asunto && <div className="invalid-feedback d-block">{errors.asunto}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="comentario" className="form-label fw-semibold text-secondary">
                                        Mensaje <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className={`form-control rounded-3 ${errors.comentario ? 'is-invalid' : ''}`}
                                        id="comentario"
                                        name="comentario"
                                        rows={5}
                                        placeholder="Describa su consulta o comentario en detalle..."
                                        value={formData.comentario}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.comentario && (
                                        <div className="invalid-feedback d-block">{errors.comentario}</div>
                                    )}
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg rounded-3 fw-semibold py-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Enviando...
                                            </>
                                        ) : (
                                            'Enviar mensaje'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer bg-light text-muted text-center py-3 border-0">
                            <div className="small mb-1">MenuAdmin</div>
                            <div className="small d-flex align-items-center justify-content-center gap-2">
                                <span>Automatizado con</span>
                                <SiN8N size={20} className="text-primary" />
                                <span className="fw-semibold">n8n</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}