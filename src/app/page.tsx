import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function page() {
  return (
    <>
      <div className="header">
        <Link href={"/"}>Deudores Admin</Link>
      </div>
      <main className={styles.main_landing}>
        <h1 className={styles.title}>App para administrar y gestionar a tus deudores</h1>
        <p className={styles.subtitle}>
          La herramienta perfecta para aquellos que desean administrar a sus deudores de manera eficiente y sin
          complicaciones.
        </p>
        <div className={styles.buttons_container}>
          {/* <Link href="https://play.google.com/store/apps/details?id=com.samuel18x.ganalealmono&hl=es_PR">
            <Image
              className={styles.image_google}
              src={"/google.png"}
              alt="Descargar apk en Google play"
              width={646}
              height={250}
            />
          </Link> */}
          <Link className={styles.button_link} href="/films">
            Empezar
          </Link>
        </div>
        <Image
          className={styles.image_app}
          src={"/banner.png"}
          alt="Captura de la app Ganale al mono"
          width={960}
          height={720}
          priority
        />
        <h2 className={styles.h2_main}>Descripción</h2>
        <p className={styles.p_main}>
          Una aplicación intuitiva diseñada para ayudarte a gestionar tus deudores de manera eficiente y organizada. Ya
          sea que estés administrando préstamos personales, dinero prestado a amigos o familiares, o incluso cobrando
          pagos pendientes por servicios prestados, Deudores Admin simplifica el proceso para ti.
        </p>
        <h2 className={styles.h2_main}>Características Principales</h2>
        <h3 className={styles.h3_main}>Gestión de Deudores:</h3>
        <p className={styles.p_main_details}>
          Registra fácilmente a tus deudores, incluyendo su nombre, información de contacto y detalles sobre la deuda.
        </p>
        <h3 className={styles.h3_main}>Seguimiento de Deudas:</h3>
        <p className={styles.p_main_details}>
          Mantén un registro detallado de las deudas pendientes, incluyendo el monto adeudado, la fecha de vencimiento y
          cualquier pago parcial realizado.
        </p>
        <h3 className={styles.h3_main}>Recordatorios Automáticos:</h3>
        <p className={styles.p_main_details}>
          Configura recordatorios automáticos para notificarte sobre las fechas de vencimiento de las deudas o para
          enviar recordatorios a tus deudores.
        </p>
        <h3 className={styles.h3_main}>Historial de Pagos:</h3>
        <p className={styles.p_main_details}>
          Registra los pagos recibidos y lleva un seguimiento del historial de pagos para cada deudor.
        </p>
        <h3 className={styles.h3_main}>Cálculo de Intereses:</h3>
        <p className={styles.p_main_details}>
          Calcula los intereses sobre las deudas pendientes de acuerdo con las condiciones acordadas y genera
          automáticamente resúmenes detallados.
        </p>
        <h3 className={styles.h3_main}>Exportación de Datos:</h3>
        <p className={styles.p_main_details}>
          Exporta fácilmente los datos de tus deudores y deudas en formatos compatibles con hojas de cálculo para un
          análisis más profundo o para compartir con otros.
        </p>
        <h3 className={styles.h3_main}>Seguridad de Datos:</h3>
        <p className={styles.p_main_details}>
          La aplicación garantiza la seguridad de tus datos mediante la encriptación y medidas de protección avanzadas.
        </p>
        <h2 className={styles.h2_main}>Beneficios</h2>
        <h3 className={styles.h3_main}>Organización:</h3>
        <p className={styles.p_main_details}>
          Mantén un registro claro y organizado de todas tus deudas y pagos pendientes en un solo lugar.
        </p>

        <h3 className={styles.h3_main}>Eficiencia:</h3>
        <p className={styles.p_main_details}>
          Ahorra tiempo al automatizar recordatorios y cálculos de intereses, permitiéndote concentrarte en otras tareas
          importantes.
        </p>

        <h3 className={styles.h3_main}>Comunicación: </h3>
        <p className={styles.p_main_details}>
          Facilita la comunicación con tus deudores al enviar recordatorios automáticos, lo que ayuda a mejorar las
          relaciones y a mantener una comunicación transparente.
        </p>

        <h3 className={styles.h3_main}>Control Financiero:</h3>
        <p className={styles.p_main_details}>
          Obtén una visión clara de tus finanzas y deudas, lo que te permite tomar decisiones informadas y controlar
          mejor tus ingresos y gastos.
        </p>

        <p className={styles.p_main_details}>
          Deudores Admin es la herramienta perfecta para aquellos que desean administrar a sus deudores de manera
          eficiente y sin complicaciones. ¡Descarga la aplicación ahora y toma el control de tus finanzas de manera
          fácil y efectiva!
        </p>
      </main>
      <footer className="footer">
        <Link href={"/privacy"}>Política de privacidad</Link>
        <Link href={"/cookies"}>Cookies</Link>
        <Link href={"/tos"}>Términos de servicio</Link>
      </footer>
    </>
  );
}
