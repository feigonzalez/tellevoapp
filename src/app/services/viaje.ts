export class Viaje {
    id_viaje=0;
    tarifa=0;
    fecha="";
    estado="";
    id_ruta=0;
    id_pasajero=0;
}

/*
    ESTADO puede tener los siguientes valores:
        solicitado: el PASAJERO solicitó pasaje para la ruta indicada
        aprobado:   el CONDUCTOR aprobó la solicitud de pasaje. este estado sólo debería usarse después de que el CONDUCTOR reciba el pago.
                en este momento, los valores de TARIFA y FECHA se fijan.
        rechazado:  el CONDUCTOR rechazó la soliitud de pasaje
        cancelado:  el CONDUCTOR o el PASAJERO canceló la solicitud del pasaje
        comenzado:  el VIAJE está siendo realizado
        completado: el VIAJE fue completado exitosamente
    
        1. el número de viajes APROBADOS no puede superar el número de asientos del vehículo de una ruta
*/
