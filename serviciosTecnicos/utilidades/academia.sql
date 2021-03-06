PGDMP     	        
            v            academia    9.4.1    10.0 2    	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            	           1262    86048    academia    DATABASE     f   CREATE DATABASE academia WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE academia;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            	           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    6            	           0    0    public    ACL     �   REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                  postgres    false    6                        3079    12123    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            	           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    87849    Administrativos    TABLE     �   CREATE TABLE "Administrativos" (
    cedulaadministrativo character varying NOT NULL,
    emailadministrativo character varying(200),
    date date,
    password character varying(300)
);
 %   DROP TABLE public."Administrativos";
       public         postgres    false    6            �            1259    86136    clase    TABLE     �   CREATE TABLE clase (
    id integer NOT NULL,
    fecha date,
    hora time without time zone,
    estudiante character varying(20),
    profesor character varying(20),
    vehiculo integer NOT NULL,
    producto integer NOT NULL
);
    DROP TABLE public.clase;
       public         postgres    false    6            �            1259    86130    clase_id_seq    SEQUENCE     n   CREATE SEQUENCE clase_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.clase_id_seq;
       public       postgres    false    6    182            	           0    0    clase_id_seq    SEQUENCE OWNED BY     /   ALTER SEQUENCE clase_id_seq OWNED BY clase.id;
            public       postgres    false    179            �            1259    86134    clase_producto_seq    SEQUENCE     t   CREATE SEQUENCE clase_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.clase_producto_seq;
       public       postgres    false    6    182            	           0    0    clase_producto_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE clase_producto_seq OWNED BY clase.producto;
            public       postgres    false    181            �            1259    86132    clase_vehiculo_seq    SEQUENCE     t   CREATE SEQUENCE clase_vehiculo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.clase_vehiculo_seq;
       public       postgres    false    182    6            	           0    0    clase_vehiculo_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE clase_vehiculo_seq OWNED BY clase.vehiculo;
            public       postgres    false    180            �            1259    86065 
   estudiante    TABLE     I  CREATE TABLE estudiante (
    documentoestudiante character varying NOT NULL,
    nombreestudiante character varying NOT NULL,
    apellidoestudiante character varying NOT NULL,
    fechanacimiento character varying,
    direccion character varying(200),
    telefono character varying(100),
    correo character varying(200)
);
    DROP TABLE public.estudiante;
       public         postgres    false    6            �            1259    86051    producto    TABLE       CREATE TABLE producto (
    idproducto integer NOT NULL,
    nombreproducto character varying NOT NULL,
    duracionproducto character varying NOT NULL,
    categoriaproducto character varying NOT NULL,
    precioproducto integer NOT NULL,
    numeroclasesproducto integer NOT NULL
);
    DROP TABLE public.producto;
       public         postgres    false    6            �            1259    86049    producto_idProducto_seq    SEQUENCE     {   CREATE SEQUENCE "producto_idProducto_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."producto_idProducto_seq";
       public       postgres    false    6    174            	           0    0    producto_idProducto_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE "producto_idProducto_seq" OWNED BY producto.idproducto;
            public       postgres    false    173            �            1259    86057    profesor    TABLE     Z  CREATE TABLE profesor (
    cedulaprofesor character varying NOT NULL,
    nombreprofesor character varying NOT NULL,
    apellidoprofesor character varying,
    fechanacimiento date,
    direccionprofesor character varying,
    telefonoprofesor character varying,
    correoprofesor character varying,
    profesionprofesor character varying
);
    DROP TABLE public.profesor;
       public         postgres    false    6            �            1259    86075    vehiculo    TABLE        CREATE TABLE vehiculo (
    idvehiculo integer NOT NULL,
    placa character varying(6) NOT NULL,
    modelo character(100)
);
    DROP TABLE public.vehiculo;
       public         postgres    false    6            �            1259    86073    vehiculo_idVehiculo_seq    SEQUENCE     {   CREATE SEQUENCE "vehiculo_idVehiculo_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."vehiculo_idVehiculo_seq";
       public       postgres    false    6    178            	           0    0    vehiculo_idVehiculo_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE "vehiculo_idVehiculo_seq" OWNED BY vehiculo.idvehiculo;
            public       postgres    false    177            �           2604    86139    clase id    DEFAULT     V   ALTER TABLE ONLY clase ALTER COLUMN id SET DEFAULT nextval('clase_id_seq'::regclass);
 7   ALTER TABLE public.clase ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    182    179    182            �           2604    86140    clase vehiculo    DEFAULT     b   ALTER TABLE ONLY clase ALTER COLUMN vehiculo SET DEFAULT nextval('clase_vehiculo_seq'::regclass);
 =   ALTER TABLE public.clase ALTER COLUMN vehiculo DROP DEFAULT;
       public       postgres    false    180    182    182            �           2604    86141    clase producto    DEFAULT     b   ALTER TABLE ONLY clase ALTER COLUMN producto SET DEFAULT nextval('clase_producto_seq'::regclass);
 =   ALTER TABLE public.clase ALTER COLUMN producto DROP DEFAULT;
       public       postgres    false    182    181    182            �           2604    86191    producto idproducto    DEFAULT     n   ALTER TABLE ONLY producto ALTER COLUMN idproducto SET DEFAULT nextval('"producto_idProducto_seq"'::regclass);
 B   ALTER TABLE public.producto ALTER COLUMN idproducto DROP DEFAULT;
       public       postgres    false    174    173    174            �           2604    86178    vehiculo idvehiculo    DEFAULT     n   ALTER TABLE ONLY vehiculo ALTER COLUMN idvehiculo SET DEFAULT nextval('"vehiculo_idVehiculo_seq"'::regclass);
 B   ALTER TABLE public.vehiculo ALTER COLUMN idvehiculo DROP DEFAULT;
       public       postgres    false    178    177    178            	          0    87849    Administrativos 
   TABLE DATA               _   COPY "Administrativos" (cedulaadministrativo, emailadministrativo, date, password) FROM stdin;
    public       postgres    false    183   �6       	          0    86136    clase 
   TABLE DATA               S   COPY clase (id, fecha, hora, estudiante, profesor, vehiculo, producto) FROM stdin;
    public       postgres    false    182   �6       	          0    86065 
   estudiante 
   TABLE DATA               �   COPY estudiante (documentoestudiante, nombreestudiante, apellidoestudiante, fechanacimiento, direccion, telefono, correo) FROM stdin;
    public       postgres    false    176   7       	          0    86051    producto 
   TABLE DATA               �   COPY producto (idproducto, nombreproducto, duracionproducto, categoriaproducto, precioproducto, numeroclasesproducto) FROM stdin;
    public       postgres    false    174   �7       	          0    86057    profesor 
   TABLE DATA               �   COPY profesor (cedulaprofesor, nombreprofesor, apellidoprofesor, fechanacimiento, direccionprofesor, telefonoprofesor, correoprofesor, profesionprofesor) FROM stdin;
    public       postgres    false    175   �7       
	          0    86075    vehiculo 
   TABLE DATA               6   COPY vehiculo (idvehiculo, placa, modelo) FROM stdin;
    public       postgres    false    178   �7       	           0    0    clase_id_seq    SEQUENCE SET     4   SELECT pg_catalog.setval('clase_id_seq', 1, false);
            public       postgres    false    179            	           0    0    clase_producto_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('clase_producto_seq', 1, false);
            public       postgres    false    181            	           0    0    clase_vehiculo_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('clase_vehiculo_seq', 1, false);
            public       postgres    false    180             	           0    0    producto_idProducto_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('"producto_idProducto_seq"', 1, false);
            public       postgres    false    173            !	           0    0    vehiculo_idVehiculo_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('"vehiculo_idVehiculo_seq"', 1, false);
            public       postgres    false    177            �           2606    87856 $   Administrativos Administrativos_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY "Administrativos"
    ADD CONSTRAINT "Administrativos_pkey" PRIMARY KEY (cedulaadministrativo);
 R   ALTER TABLE ONLY public."Administrativos" DROP CONSTRAINT "Administrativos_pkey";
       public         postgres    false    183            �           2606    86143    clase clase_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY clase
    ADD CONSTRAINT clase_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.clase DROP CONSTRAINT clase_pkey;
       public         postgres    false    182            �           2606    86165    estudiante estudiante_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY estudiante
    ADD CONSTRAINT estudiante_pkey PRIMARY KEY (documentoestudiante);
 D   ALTER TABLE ONLY public.estudiante DROP CONSTRAINT estudiante_pkey;
       public         postgres    false    176            �           2606    86193    producto producto_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (idproducto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public         postgres    false    174            �           2606    86172    profesor profesor_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY profesor
    ADD CONSTRAINT profesor_pkey PRIMARY KEY (cedulaprofesor);
 @   ALTER TABLE ONLY public.profesor DROP CONSTRAINT profesor_pkey;
       public         postgres    false    175            �           2606    86180    vehiculo vehiculo_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY vehiculo
    ADD CONSTRAINT vehiculo_pkey PRIMARY KEY (idvehiculo);
 @   ALTER TABLE ONLY public.vehiculo DROP CONSTRAINT vehiculo_pkey;
       public         postgres    false    178            �           2606    86166    clase FkEstudiante    FK CONSTRAINT     ~   ALTER TABLE ONLY clase
    ADD CONSTRAINT "FkEstudiante" FOREIGN KEY (estudiante) REFERENCES estudiante(documentoestudiante);
 >   ALTER TABLE ONLY public.clase DROP CONSTRAINT "FkEstudiante";
       public       postgres    false    182    2189    176            �           2606    86186    clase FkProducto    FK CONSTRAINT     o   ALTER TABLE ONLY clase
    ADD CONSTRAINT "FkProducto" FOREIGN KEY (vehiculo) REFERENCES vehiculo(idvehiculo);
 <   ALTER TABLE ONLY public.clase DROP CONSTRAINT "FkProducto";
       public       postgres    false    182    2191    178            �           2606    86173    clase FkProfesor    FK CONSTRAINT     s   ALTER TABLE ONLY clase
    ADD CONSTRAINT "FkProfesor" FOREIGN KEY (profesor) REFERENCES profesor(cedulaprofesor);
 <   ALTER TABLE ONLY public.clase DROP CONSTRAINT "FkProfesor";
       public       postgres    false    182    2187    175            �           2606    86181    clase FkVehiculo    FK CONSTRAINT     o   ALTER TABLE ONLY clase
    ADD CONSTRAINT "FkVehiculo" FOREIGN KEY (vehiculo) REFERENCES vehiculo(idvehiculo);
 <   ALTER TABLE ONLY public.clase DROP CONSTRAINT "FkVehiculo";
       public       postgres    false    2191    182    178            	      x������ � �      	      x������ � �      	   [   x�3405�0�0�0�t�tu��tr�s��4��4�50�50�t.R02�4642�42403�L�LM/�,�O+J�K�7uH�M���K������� *#      	      x������ � �      	      x������ � �      
	      x������ � �     