# 📋 Tutorial de Acceso - Censo Burkina Faso

## 🌐 URL de la Aplicación

**https://burkina-faso-gamma.vercel.app/**

---

## 📱 Acceso Público (Formulario)

La página principal permite a los ciudadanos registrar información demográfica:

1. Abre https://burkina-faso-gamma.vercel.app/
2. Completa el formulario con:
   - **Nombre completo**
   - **Ciudad** (selecciona de la lista)
   - **Edad**
3. Haz clic en **"Registrar"**
4. Los datos se guardan automáticamente

**Nota:** En la página pública NO se ven las estadísticas ni datos totales.

---

## 🔐 Acceso Administrativo

### 📍 Ruta de Login

Ve directamente a: **https://burkina-faso-gamma.vercel.app/admin/login**

### 🔑 Credenciales Iniciales

```
Email: admin@censo.bf
Contraseña: admin123
```

### 📊 Panel Administrativo

Una vez autenticado, accedes a:

- **Estadísticas totales:**
  - Total de registros
  - Cantidad de Mayores (≥18 años)
  - Cantidad de Menores (<18 años)
  - Promedio de edad

- **Filtros por categoría:**
  - Todos
  - Mayores de edad
  - Menores de edad

- **Exportar datos:**
  - CSV
  - PDF
  - Imprimir

- **Tabla de registros** con búsqueda y filtros

---

## 🔄 Cambiar Credenciales de Admin

### Opción 1: A través del Desarrollador (Recomendado)

Si deseas cambiar el usuario o contraseña de admin:

1. Contacta al desarrollador
2. Proporciona:
   - Nuevo email de admin
   - Nueva contraseña

El desarrollador creará el nuevo usuario en el sistema.

### Opción 2: Acceso Directo a Supabase (Avanzado)

Si tienes acceso a **Supabase Dashboard**:

1. Ve a: https://supabase.com/dashboard
2. Inicia sesión con tu proyecto
3. Ve a **Authentication > Users**
4. Haz clic en **"Add user"**
5. Ingresa:
   - Email: `tu-email@dominio.com`
   - Password: `tu-contraseña-segura`
6. Haz clic en **"Create user"**

Luego podrás acceder a:
```
https://burkina-faso-gamma.vercel.app/admin/login
```

Con tus nuevas credenciales.

---

## 🛡️ Seguridad

- ✅ Las credenciales de admin NO se ven en la interface pública
- ✅ Solo accediendo a `/admin/login` puedes iniciar sesión
- ✅ Todos los datos sensibles están protegidos en Supabase
- ✅ La sesión se mantiene segura en tu navegador

---

## ❓ Preguntas Frecuentes

**P: ¿Puede cualquiera ver las estadísticas?**
R: No. Las estadísticas (totales, mayores, menores) solo aparecen en el panel admin. El público solo ve el formulario.

**P: ¿Qué pasa si olvido la contraseña?**
R: Contacta al desarrollador para resetear. Por ahora, no hay función de "olvide mi contraseña".

**P: ¿Los datos están seguros?**
R: Sí. Todo está almacenado en Supabase con encriptación SSL y backups automáticos.

**P: ¿Puedo agregar más usuarios admin?**
R: Sí. Contacta al desarrollador o usa Supabase Dashboard directamente.

---

## 📞 Soporte

Si tienes problemas:

1. Verifica la URL: `https://burkina-faso-gamma.vercel.app/admin/login`
2. Intenta en otro navegador
3. Limpia el caché (Ctrl+Shift+Del)
4. Contacta al desarrollador si persiste el problema

---

**Última actualización:** 30 de junio de 2026
