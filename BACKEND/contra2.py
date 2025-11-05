from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

contraseña = "Prueba123"

hasheada = password_hash.hash(contraseña)

print("Hash: ", hasheada)
print("Verificación prueba: ", password_hash.verify("Prueba123", hasheada))