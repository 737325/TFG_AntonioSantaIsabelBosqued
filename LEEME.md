# TFG_AntonioSantaIsabelBosqued
#
#Es necesario configurar el back-end. Para ello hay que acceder a /back-end/src/main/resources/application.properties
#Y configurar los siguientes parametros
    spring.datasource.url= jdbc:mysql://localhost:3306/turomas_plantillas     #IMPORTANTE: mantener jdbc:mysql: antes de la direccion
    spring.datasource.username= <username>
    spring.datasource.password= <password>
    
# Para el despliegue del front-end es necesario escribir en la consola de comandos:
    ng serve --open --host 0.0.0.0
    
    Si da fallos, añadir "--disableHostCheck" puede solucionar el problema
