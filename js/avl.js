

class nodo_vendedor{
    constructor(id, nombre, edad, correo, password){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.correo = correo;
        this.password = password;
        this.izq = null;
        this.der = null;
        this.altura = 0;
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    insertar(id, nombre, edad, correo, password){
        let nuevo = new nodo_vendedor(id, nombre, edad, correo, password);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo);
        }
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq,nuevo);
                
                
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==-2){
                    console.log("entra a rotacion IZQUIERDA");
                    
                    if(nuevo.id < raiz_actual.izq.id){ 
                        console.log("entra a rotacion IZQUIERDA IZQUIERDA");
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ 
                        console.log("entra a rotacion IZQUIERDA DERECHA");
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der,nuevo);
               
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==2){
                    console.log("entra a rotacion DERECHA");
                    if(nuevo.id > raiz_actual.der.id){ 
                        console.log("entra a rotacion DERECHA DERECHA");
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{
                        console.log("entra a rotacion DERECHA IZQUIERDA");
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL id PORQUE YA EXISTE");
            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izq))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }

    altura_maxima(h1,h2){
        if(h2>=h1){ 
            return h2;
        }else{
            return h1;
        }

    }
    r_izquierda(nodo){
        let aux = nodo.izq;
        nodo.izq= aux.der;
        aux.der = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.der),this.altura(nodo.izq)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izq))+1;
        return aux;
    }

    r_derecha(nodo){
        let aux = nodo.der;
        nodo.der= aux.izq;
        aux.izq = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izq),this.altura(nodo.der)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.der))+1;
        return aux;
    }

    r_izq_der(nodo){
        nodo.izq = this.r_derecha(nodo.izq);
        let aux = this.r_izquierda(nodo);
        return aux;
    }

    r_der_izq(nodo){
        nodo.der = this.r_izquierda(nodo.der);
        let aux = this.r_derecha(nodo);
        return aux;
    }

    preorden(raiz_actual){
        if(raiz_actual != null){
            console.log(raiz_actual.id);
            this.preorden(raiz_actual.izq);
            this.preorden(raiz_actual.der);
        }
    }

    inOrden(raiz_actual){
        if(raiz_actual != null){
            this.inOrden(raiz_actual.izq);
            console.log(raiz_actual.id);
            console.log("altura= "+(this.altura(raiz_actual.der)-this.altura(raiz_actual.iz)))
            this.inOrden(raiz_actual.der);
        }
    }

    postOrden(raiz_actual){
        if(raiz_actual != null){
            this.postOrden(raiz_actual.izq);
            this.postOrden(raiz_actual.der);
            console.log(raiz_actual.id);
        }
    }

    generarDot(){
        let cadena="digraph arbol {\n";
        cadena+= this.generar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }

    generar_nodos(raiz_actual){ 
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.id+"[label=\""+raiz_actual.id+" "+raiz_actual.nombre+"\"]\n";
            nodos+=this.generar_nodos(raiz_actual.izq);
            nodos+=this.generar_nodos(raiz_actual.der);
        }
        return nodos;
    }

    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            cadena += this.enlazar(raiz_actual.izq);
            cadena += this.enlazar(raiz_actual.der);
    
            if(raiz_actual.izq != null){
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.izq.id+"\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.der.id+"\n";
            }

            
        }
        return cadena;
    }
}

