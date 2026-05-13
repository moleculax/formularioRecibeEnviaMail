# 📝 Formulario a Base de Datos - n8n Automation

![n8n version](https://img.shields.io/badge/n8n-1.0%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-API-green)
![Gmail](https://img.shields.io/badge/Gmail-API-red)
![License](https://img.shields.io/badge/license-MIT-green)

> Automatización que recibe datos desde un formulario web, los almacena en PostgreSQL y Google Sheets simultáneamente, y envía una confirmación por email.

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características](#-características)
- [Arquitectura del Workflow](#-arquitectura-del-workflow)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Workflow](#-estructura-del-workflow)
- [Variables de Entorno](#-variables-de-entorno)
- [API Endpoints](#-api-endpoints)
- [Formato de Datos](#-formato-de-datos)
- [Solución de Problemas](#-solución-de-problemas)
- [Personalización](#-personalización)

## 🎯 Descripción General

Este workflow de n8n actúa como un backend completo para formularios web. Cuando un usuario envía un formulario:

1. **Recibe los datos** vía Webhook
2. **Valida la información** (campos requeridos)
3. **Almacena en PostgreSQL** para respaldo estructurado
4. **Registra en Google Sheets** para fácil visualización
5. **Envía email de confirmación** al usuario
6. **Notifica al administrador** (opcional)

### Casos de uso ideales

- 📋 Formularios de contacto
- 📝 Registro de clientes/leads
- 📊 Encuestas y feedback
- 🎓 Inscripciones a eventos
- 🛒 Pedidos simples

## ✨ Características

| Característica | Descripción |
|----------------|-------------|
| **API RESTful** | Endpoint único para recibir datos |
| **Almacenamiento dual** | PostgreSQL + Google Sheets |
| **Confirmación automática** | Email al usuario al completar |
| **Validación de datos** | Campos requeridos y tipos |
| **Logs detallados** | Seguimiento de cada ejecución |
| **Manejo de errores** | Respuestas claras ante fallos |
| **Idempotencia** | Evita duplicados por ID único |

## 🏗️ Arquitectura del Workflow

```mermaid
graph LR
    A[Formulario Web] -->|HTTP POST| B[Webhook n8n]
    B --> C[Validar Datos]
    C --> D{¿Datos válidos?}
    D -->|No| E[Respuesta Error]
    D -->|Sí| F[Insertar PostgreSQL]
    F --> G[Agregar Google Sheets]
    G --> H[Email Confirmación]
    H --> I[Email Admin]
    I --> J[Respuesta Éxito]
    
    style A fill:#667eea,color:#fff
    style J fill:#10b981,color:#fff
    style E fill:#ef4444,color:#fff
