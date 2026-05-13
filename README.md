# ?? Formulario a Base de Datos - n8n Automation

![n8n version](https://img.shields.io/badge/n8n-1.0%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-API-green)
![Gmail](https://img.shields.io/badge/Gmail-API-red)
![License](https://img.shields.io/badge/license-MIT-green)

> Automatizaci車n que recibe datos desde un formulario web, los almacena en PostgreSQL y Google Sheets simult芍neamente, y env赤a una confirmaci車n por email.

![Captura de pantalla del workflow](https://raw.githubusercontent.com/moleculax/formularioRecibeEnviaMail/main/screen.png)

## ?? Tabla de Contenidos

- [Descripci車n General](#-descripci車n-general)
- [Caracter赤sticas](#-caracter赤sticas)
- [Arquitectura del Workflow](#-arquitectura-del-workflow)
- [Requisitos Previos](#-requisitos-previos)
- [Instalaci車n y Configuraci車n](#-instalaci車n-y-configuraci車n)
- [Estructura del Workflow](#-estructura-del-workflow)
- [Variables de Entorno](#-variables-de-entorno)
- [API Endpoints](#-api-endpoints)
- [Formato de Datos](#-formato-de-datos)
- [Soluci車n de Problemas](#-soluci車n-de-problemas)
- [Personalizaci車n](#-personalizaci車n)

## ?? Descripci車n General

Este workflow de n8n act迆a como un backend completo para formularios web. Cuando un usuario env赤a un formulario:

1. **Recibe los datos** v赤a Webhook
2. **Valida la informaci車n** (campos requeridos)
3. **Almacena en PostgreSQL** para respaldo estructurado
4. **Registra en Google Sheets** para f芍cil visualizaci車n
5. **Env赤a email de confirmaci車n** al usuario
6. **Notifica al administrador** (opcional)

### Casos de uso ideales

- ?? Formularios de contacto
- ?? Registro de clientes/leads
- ?? Encuestas y feedback
- ?? Inscripciones a eventos
- ?? Pedidos simples

## ? Caracter赤sticas

| Caracter赤stica | Descripci車n |
|----------------|-------------|
| **API RESTful** | Endpoint 迆nico para recibir datos |
| **Almacenamiento dual** | PostgreSQL + Google Sheets |
| **Confirmaci車n autom芍tica** | Email al usuario al completar |
| **Validaci車n de datos** | Campos requeridos y tipos |
| **Logs detallados** | Seguimiento de cada ejecuci車n |
| **Manejo de errores** | Respuestas claras ante fallos |
| **Idempotencia** | Evita duplicados por ID 迆nico |

## ??? Arquitectura del Workflow

```mermaid
graph LR
    A[Formulario Web] -->|HTTP POST| B[Webhook n8n]
    B --> C[Validar Datos]
    C --> D{?Datos v芍lidos?}
    D -->|No| E[Respuesta Error]
    D -->|S赤| F[Insertar PostgreSQL]
    F --> G[Agregar Google Sheets]
    G --> H[Email Confirmaci車n]
    H --> I[Email Admin]
    I --> J[Respuesta 谷xito]
    
    style A fill:#667eea,color:#fff
    style J fill:#10b981,color:#fff
    style E fill:#ef4444,color:#fff