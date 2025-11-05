from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, InvalidHash

# Configuración recomendada por defecto:
# variant por defecto en argon2-cffi es argon2id cuando se usa PasswordHasher.
# ph = PasswordHasher(
#     time_cost=3,        # iteraciones de tiempo (ajustar según tu hardware)
#     memory_cost=64 * 1024,  # memoria en KiB (ej: 64 MiB = 64*1024)
#     parallelism=4,      # hilos
#     hash_len=32,        # largo del hash en bytes
#     salt_len=16         # largo de la salt en bytes
# )

ph = PasswordHasher()

def hash_password(password: str) -> str:
    """
    Devuelve el hash seguro (string) que podes guardar en DB.
    """
    return ph.hash(password)

def verify_password(hash: str, password: str) -> bool:
    """
    Verifica contraseña contra hash. Devuelve True/False.
    """
    try:
        return ph.verify(hash, password)
    except VerifyMismatchError:
        return False
    except InvalidHash:
        # Hash corrupto o no válido
        return False

# Ejemplo de uso
if __name__ == "__main__":
    pwd = "admin123"
    h = hash_password(pwd)
    print("Hash:", h)

    print("Verifica bien:", verify_password(h, "admin123"))
    print("Verifica mal:", verify_password(h, "otra"))
