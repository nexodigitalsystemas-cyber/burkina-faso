# 🔑 Guía de Credenciales - Para Administradores

## 📌 Situación Actual

**Credenciales por defecto:**
```
Email: admin@censo.bf
Contraseña: admin123
```

Estas credenciales están en **Supabase Authentication** y funcionan para cualquiera que tenga acceso a:
```
https://burkina-faso-gamma.vercel.app/admin/login
```

---

## ❓ Opciones para Credenciales Personalizadas

### Opción 1: Cliente Crea Sus Propias Credenciales (RECOMENDADO)

**El cliente accede a Supabase directamente:**

1. El desarrollador proporciona:
   - URL del proyecto Supabase
   - Email y contraseña de acceso (rol admin en Supabase)

2. El cliente entra a: `https://supabase.com/dashboard`

3. Ve a **Authentication > Users**

4. Crea nuevos usuarios admin:
   - Email: `nuevo-admin@dominio.com`
   - Password: `contraseña-fuerte`

5. Accede a la app con las nuevas credenciales:
   ```
   https://burkina-faso-gamma.vercel.app/admin/login
   Email: nuevo-admin@dominio.com
   Password: contraseña-fuerte
   ```

**Ventajas:**
- ✅ Cliente controla sus propias credenciales
- ✅ Puede agregar/quitar usuarios sin intervención del desarrollador
- ✅ Control total sobre seguridad

**Desventajas:**
- ⚠️ Requiere acceso a Supabase (panel técnico)
- ⚠️ Responsabilidad de mantener seguras las credenciales

---

### Opción 2: Desarrollador Gestiona Credenciales

**El desarrollador crea y mantiene los usuarios:**

1. Cliente pide: "Necesito un usuario admin con email X y contraseña Y"
2. Desarrollador crea en Supabase Authentication
3. Desarrollador comparte las credenciales con el cliente
4. Cliente accede a la app

**Ventajas:**
- ✅ Simple para el cliente
- ✅ Desarrollador asegura buenas prácticas

**Desventajas:**
- ⚠️ Cliente depende del desarrollador
- ⚠️ Cada cambio requiere contactar al desarrollador

---

### Opción 3: Credenciales Personalizadas en Variables de Entorno (AVANZADO)

Si el cliente quiere "secretas" adicionales o credenciales de solo lectura:

Se puede crear un sistema de roles en el código:

```typescript
// En authStore.ts - Ejemplo de extensión
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ... código actual ...

      // Nuevo: Roles de usuario
      userRole: 'admin' | 'viewer' | null,
      
      loginWithRole: async (email, password, role) => {
        // Valida credenciales + rol
        // Puede restricionar qué datos ve cada rol
      }
    })
  )
);
```

**Casos de uso:**
- Usuarios de "solo lectura" (ver datos, no exportar)
- Usuarios con permisos limitados
- Auditoría (tracks de quién vio qué)

---

## 🎯 Recomendación

**Para Burkina Faso Census, la mejor opción es:**

### ✅ Opción 1 + Opción 2

1. **Inicialmente:** Cliente accede con `admin@censo.bf / admin123`
2. **Luego:** Cliente pide acceso a Supabase para crear sus propios usuarios
3. **Resultado:** Cliente es autosuficiente pero tiene soporte del desarrollador

---

## 🔒 Consideraciones de Seguridad

1. **Nunca compartir credenciales por:**
   - Email sin cifrar
   - WhatsApp
   - SMS

2. **Usar canales seguros:**
   - Password manager compartido (1Password, Bitwarden)
   - Llamada telefónica confirmada
   - Sistema de invitación de Supabase

3. **Para Supabase Dashboard:**
   - Activar 2FA (Two-Factor Authentication)
   - Usar RLS (Row Level Security) para proteger datos
   - Rotar contraseñas cada 90 días

4. **Para la App:**
   - Cambiar `admin123` por contraseña fuerte
   - No usar la misma contraseña en otros sistemas

---

## 📋 Checklist de Implementación

- [ ] Cliente entiende acceso público vs admin
- [ ] Cliente cambió las credenciales por defecto
- [ ] Cliente tiene acceso a Supabase (si es Option 1)
- [ ] Cliente creo su primer usuario admin personalizado
- [ ] Cliente probó login exitosamente
- [ ] Se documentaron las credenciales de forma segura

---

**Pregunta al cliente:**
> "¿Prefieres crear tus propias credenciales en Supabase o prefieres que yo las maneje por ti?"

