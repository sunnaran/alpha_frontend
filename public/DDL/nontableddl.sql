--------------------------------------------------------
--  File created - Wednesday-May-03-2023   
--------------------------------------------------------
DROP DATABASE LINK "ALPHA"."LINK1";
DROP PROCEDURE "ALPHA"."HTP_PRN";
DROP FUNCTION "ALPHA"."F_BELL_GET";
DROP FUNCTION "ALPHA"."F_BELL_INSERT";
DROP FUNCTION "ALPHA"."F_CHOOSER";
DROP FUNCTION "ALPHA"."F_CRM_W_DELETE";
DROP FUNCTION "ALPHA"."F_CRM_W_GET";
DROP FUNCTION "ALPHA"."F_CRM_W_INSERT_OR_UPDATE";
DROP FUNCTION "ALPHA"."F_GET_PRODUCTS";
DROP FUNCTION "ALPHA"."F_GET_PRODUCT_IMAGES";
DROP FUNCTION "ALPHA"."F_GET_SHIREE";
DROP FUNCTION "ALPHA"."F_GLBL_CHANGEPASSWORD";
DROP FUNCTION "ALPHA"."F_HUULGA";
DROP FUNCTION "ALPHA"."F_ORDER_INSERT";
DROP FUNCTION "ALPHA"."F_ORLOGO_INSERT";
DROP FUNCTION "ALPHA"."F_PRODUCT_DELETE";
DROP FUNCTION "ALPHA"."F_PRODUCT_INSERT_OR_UPDATE";
DROP FUNCTION "ALPHA"."F_SHIREE_DELETE";
DROP FUNCTION "ALPHA"."F_SHIREE_INSERT_OR_UPDATE";
DROP FUNCTION "ALPHA"."F_ULDEGDEL";
DROP FUNCTION "ALPHA"."F_USR_DELETE";
DROP FUNCTION "ALPHA"."F_USR_GET";
DROP FUNCTION "ALPHA"."F_USR_INSERT_OR_UPDATE";
DROP FUNCTION "ALPHA"."GET_RESPONSE_JSON";
DROP FUNCTION "ALPHA"."LOGIN_USR_PWD";
DROP FUNCTION "ALPHA"."MAKE_REQUEST";
--------------------------------------------------------
--  DDL for DB Link LINK1
--------------------------------------------------------

  CREATE DATABASE LINK "LINK1"
   CONNECT TO "ALPHA" IDENTIFIED BY VALUES ':1'
   USING '65.109.6.10:1521/ORCL';
--------------------------------------------------------
--  DDL for Procedure HTP_PRN
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "ALPHA"."HTP_PRN" (p_clob CLOB)
AS
    chunksize   CONSTANT INTEGER := 5000;

    pos                  NUMBER := 1;
BEGIN
    OWA_UTIL.mime_header ('application/json');

    IF LENGTH (p_clob) > chunksize
    THEN
        LOOP
            HTP.prn (SUBSTR (p_clob, pos, chunksize));

            pos := pos + chunksize;

            EXIT WHEN pos > LENGTH (p_clob);
        END LOOP;
    ELSE
        HTP.prn (p_clob);
    END IF;
END htp_prn;

/
--------------------------------------------------------
--  DDL for Function F_BELL_GET
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_BELL_GET" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (255) := l_body_json.get_string ('token');
    l_resp CLOB;
BEGIN
    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   JSON_OBJECT (
                       'list' VALUE
                           JSON_ARRAYAGG (
                               JSON_OBJECT ('id' VALUE id,
                                            'tableid' VALUE tableid,
                                            'tablename' VALUE tablename,
                                            'createddate' VALUE createddate,
                                            'deleted' VALUE deleted
                                            RETURNING CLOB)
                               RETURNING CLOB)
                       RETURNING CLOB)
               RETURNING CLOB)
      INTO l_resp
      FROM T_BELL
     WHERE DELETED = '0' and CREATEDDATE > TO_CHAR (SYSDATE-3/24/60, 'YYYY-MM-DD HH24:MI:SS');

    RETURN l_resp;
END F_BELL_GET;

/
--------------------------------------------------------
--  DDL for Function F_BELL_INSERT
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_BELL_INSERT" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (255) := l_body_json.get_string ('token');
    l_tableid     VARCHAR2 (255);
    l_tablename   VARCHAR2 (255);
    l_id   VARCHAR2 (32);
    l_bellid   VARCHAR2 (32);
BEGIN
    --created user
    BEGIN
        SELECT id, NME
          INTO l_tableid, l_tablename
          FROM T_SHIREE
         WHERE qrid = l_token and deleted = '0';
    EXCEPTION
        WHEN OTHERS
        THEN
            l_tableid := NULL;
    END;

    IF l_tableid IS NULL
    THEN
        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => l_tableid);
    ELSE
        BEGIN

        SELECT ID INTO l_bellid FROM T_BELL WHERE TABLEID = l_tableid;
        IF l_bellid IS NULL THEN
         INSERT INTO T_BELL (TABLEID, TABLENAME)
             VALUES (l_tableid, l_tablename)
          RETURNING id
               INTO l_bellid;
        ELSE
         UPDATE T_BELL SET CREATEDDATE = TO_CHAR(sysdate, 'YYYY-MM-DD HH24:MI:SS') WHERE id = l_bellid;        
        END IF;
       EXCEPTION
    WHEN OTHERS THEN
         INSERT INTO T_BELL (TABLEID, TABLENAME)
             VALUES (l_tableid, l_tablename)
          RETURNING id
               INTO l_bellid;



        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',

                      p_result         => l_bellid);
      END;

    END IF;
  COMMIT;
    --insert

    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_BELL_INSERT;

/
--------------------------------------------------------
--  DDL for Function F_CHOOSER
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_CHOOSER" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json     json_object_t := json_object_t (p_body);
    l_resp          CLOB;
    l_search_text   VARCHAR2 (255) := l_body_json.get_string ('search_text');
BEGIN
    CASE l_search_text
        WHEN 'workers'
        THEN
            BEGIN
                SELECT JSON_OBJECT (
                           'status' VALUE 'success',
                           'code' VALUE 200,
                           'message' VALUE 'Амжилттай',
                           'result' VALUE
                               JSON_OBJECT (
                                   'list' VALUE
                                       JSON_ARRAYAGG (
                                           JSON_OBJECT (
                                               'id' VALUE id,
                                               'name' VALUE fnm 

                                               RETURNING CLOB)
                                           RETURNING CLOB)
                                   RETURNING CLOB)
                           RETURNING CLOB)
                  INTO l_resp
                  FROM T_USERS WHERE DELETED = '0';
            END;
        WHEN 'baraaniiturul'
        THEN
            BEGIN
                SELECT JSON_OBJECT (
                           'status' VALUE 'success',
                           'code' VALUE 200,
                           'message' VALUE 'Амжилттай',
                           'result' VALUE
                               JSON_OBJECT (
                                   'list' VALUE
                                       JSON_ARRAYAGG (
                                           JSON_OBJECT (
                                               'id' VALUE id,
                                               'name' VALUE nme,
                                               'pht' VALUE pht
                                               RETURNING CLOB)
                                           RETURNING CLOB)
                                   RETURNING CLOB)
                           RETURNING CLOB)
                  INTO l_resp
                  FROM T_BARAA_TURUL where DELETED = '0' order by srt asc;
            END;
        ELSE

                SELECT
                    JSON_OBJECT ( 'code' VALUE 404, 'status' VALUE 'error', 'message' VALUE l_search_text, 'result' VALUE l_search_text
                   )
                INTO l_resp
                FROM
                    dual;
    END CASE;

    COMMIT;
    RETURN l_resp;
END F_CHOOSER;

/
--------------------------------------------------------
--  DDL for Function F_CRM_W_DELETE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_CRM_W_DELETE" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body                 CLOB;
    l_body_json            json_object_t := json_object_t (p_body);
    l_resp CLOB;
    l_id VARCHAR2(255);
BEGIN
    l_body := p_body;
    l_id := l_body_json.get_string('id');      
     
    UPDATE T_HURUNGU SET DELETED = '1', SYNCED = '0' WHERE ID = l_id;   
    COMMIT;    
    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE l_id || '-тай өгөгдлийг устгав' Returning clob)
      INTO l_resp
      FROM dual; 
    RETURN l_resp;
END F_CRM_W_DELETE;

/
--------------------------------------------------------
--  DDL for Function F_CRM_W_GET
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_CRM_W_GET" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json      json_object_t := json_object_t (p_body);
    --pagination
    l_total_row      NUMBER := 0;
    l_total_page     NUMBER := 0;
    l_selected_row   NUMBER := 0;
    p_page_size      NUMBER;
    p_page_number    NUMBER;
    l_page_size      NUMBER;
    l_offset         NUMBER;
    --payload
    l_token          VARCHAR2 (255) := l_body_json.get_string ('token');
    l_id             VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('id'), NULL);
    l_pht            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('pht'), NULL);
    l_nme            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('nme'), NULL);
    l_une            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('une'), NULL);
    l_too            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('too'), NULL);
    l_eid            VARCHAR2 (32)
                         := NVL (l_body_json.get_string ('eid'), NULL);
    l_enm            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('enm'), NULL);
    l_sts            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('sts'), NULL);
    l_usr            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('usr'), NULL);
    l_cdt            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('cdt'), NULL);
    --response
    l_resp           CLOB;
    -- query
    v_qry            VARCHAR2 (4000);
    v_qry_insert     VARCHAR2 (4000);
    v_qry_count      VARCHAR2 (4000);
    v_qry_select     VARCHAR2 (4000);
    v_qry_from       VARCHAR2 (4000);
    --condition
    s_id             VARCHAR2 (32) := ' and 1=1';
    s_pht            VARCHAR2 (255) := ' and 1=1';
    s_nme            VARCHAR2 (255) := ' and 1=1';
    s_too            VARCHAR2 (255) := ' and 1=1';
    s_une            VARCHAR2 (255) := ' and 1=1';
    s_eid            VARCHAR2 (255) := ' and 1=1';
    s_enm            VARCHAR2 (1000) := ' and 1=1';
    s_sts            VARCHAR2 (1000) := ' and 1=1';
    s_usr            VARCHAR2 (255) := ' and 1=1';
    s_cdt            VARCHAR2 (255) := ' and 1=1';

    --config
    c_dateformat     VARCHAR2 (255) := 'YYYY/MM/DD';
    c_groupby        VARCHAR2 (255) := ' group by ID';
    s_offset         VARCHAR2 (255);
    --ROLE FILTER
    rf_l_sqd         VARCHAR2 (255) := NULL;
    rf_s_sqd         VARCHAR2 (255) := ' and 1=1';
    s_sqd            VARCHAR2 (255) := ' and 1=1';
    rf_role          VARCHAR2 (255) := NULL;
    rf_userid        VARCHAR2 (255) := NULL;
BEGIN
    --role
    BEGIN
        SELECT id, RLE
          INTO rf_userid, rf_role
          FROM T_USERS
         WHERE token = l_token AND RLE LIKE '%scr%';
    EXCEPTION
        WHEN OTHERS
        THEN
            rf_l_sqd := NULL;
            rf_s_sqd := NULL;
            rf_role := NULL;
            rf_userid := NULL;
    END;

    IF rf_role IS NOT NULL
    THEN
        rf_s_sqd := ' and LOWER(eid) like ''%' || LOWER (rf_userid) || '%''';
    END IF;

    --pagination
    p_page_size := l_body_json.get_string ('page_size');
    p_page_number := l_body_json.get_string ('page_number');
    l_page_size := NVL (p_page_size, 50);
    l_offset := l_page_size * (NVL (p_page_number, 1) - 1);
    s_offset := ' OFFSET ' || l_offset || ' ROWS
           FETCH NEXT ' || l_page_size || '  ROWS ONLY ';

    -- where condition
    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_pht IS NOT NULL
    THEN
        s_pht := ' and LOWER(photo) like ''%' || LOWER (l_pht) || '%''';
    END IF;

    IF l_nme IS NOT NULL
    THEN
        s_nme := ' and LOWER(name) like ''%' || LOWER (l_nme) || '%''';
    END IF;

    IF l_too IS NOT NULL
    THEN
        s_too := ' and LOWER(too) like ''%' || LOWER (l_too) || '%''';
    END IF;

    IF l_une IS NOT NULL
    THEN
        s_une := ' and LOWER(une) like ''%' || LOWER (l_une) || '%''';
    END IF;

    IF l_eid IS NOT NULL
    THEN
        s_eid := ' and LOWER(ezenid) like ''%' || LOWER (l_eid) || '%''';
    END IF;

    IF l_enm IS NOT NULL
    THEN
        s_enm := ' and LOWER(ezenname) like ''%' || LOWER (l_enm) || '%''';
    END IF;

    IF l_sts IS NOT NULL
    THEN
        s_sts := ' and LOWER(status) like ''%' || LOWER (l_sts) || '%''';
    END IF;

    IF l_cdt IS NOT NULL
    THEN
        s_cdt := ' and LOWER(cdt) like ''%' || LOWER (l_cdt) || '%''';
    END IF;



    v_qry_count :=
           'select count(*) from T_HURUNGU where deleted = 0 and -1=-1 '
        || s_id
        || s_pht
        || s_nme
        || rf_s_sqd
        || s_too
        || s_une
        || s_sts
        || s_eid
        || s_enm
        || s_cdt
        || ' order by cdt desc';

    EXECUTE IMMEDIATE v_qry_count
        INTO l_total_row;

    --total row ees huudasnii too olno

    --client ruu ilgeeh ugugdul

    v_qry_insert :=
           'insert into t_temp value (select id from T_HURUNGU where deleted = 0 and -1=-1 '
        || s_id
        || s_pht
        || s_nme
        || rf_s_sqd
        || s_too
        || s_une
        || s_sts
        || s_eid
        || s_enm
        || s_cdt
        || ' order by cdt desc'
        || s_offset
        || ')';


    EXECUTE IMMEDIATE v_qry_insert;

    --
    SELECT COUNT (*) INTO l_selected_row FROM T_TEMP;

    l_total_page := TRUNC (l_total_row / l_page_size, 0);

    IF l_total_page * l_page_size < l_total_row
    THEN
        l_total_page := l_total_page + 1;
    END IF;


    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   JSON_OBJECT (
                       'pagination' VALUE
                           JSON_OBJECT (
                               'total_row' VALUE l_total_row,
                               'page_size' VALUE l_page_size,
                               'page_number' VALUE p_page_number,
                               'start_row' VALUE l_offset + 1,
                               'end_row' VALUE l_offset + l_selected_row,
                               'total_page' VALUE l_total_page
                               RETURNING CLOB),
                       'list' VALUE
                           JSON_ARRAYAGG (
                               JSON_OBJECT ('id' VALUE id,
                                            'pht' VALUE photo,
                                            'nme' VALUE name,
                                            'too' VALUE too,
                                            'une' VALUE une,
                                            'eid' VALUE ezenid,
                                            'enm' VALUE ezenname,
                                            'sts' VALUE status,
                                            'usr' VALUE usr,
                                            'cdt' VALUE cdt
                                            RETURNING CLOB)
                               RETURNING CLOB)
                       RETURNING CLOB)
               RETURNING CLOB)
      INTO l_resp
      FROM T_HURUNGU t1
     WHERE id IN (SELECT ID FROM T_TEMP);

    COMMIT;
    RETURN l_resp;
END F_CRM_W_GET;

/
--------------------------------------------------------
--  DDL for Function F_CRM_W_INSERT_OR_UPDATE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_CRM_W_INSERT_OR_UPDATE" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (32) := l_body_json.get_string ('token');
    l_userid      VARCHAR2 (255);


    --payload
    l_id          VARCHAR2 (32) := NVL (l_body_json.get_string ('id'), NULL);
    l_name        VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('nme'), NULL);
    l_photo       CLOB := NVL (l_body_json.get_clob ('pht'), NULL);

    l_une         VARCHAR2 (32) := NVL (l_body_json.get_string ('une'), NULL);
    l_too         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('too'), NULL);
    l_nune        VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('nune'), NULL);
    l_ezenid      VARCHAR2 (32)
                      := NVL (l_body_json.get_string ('eid'), NULL);
    l_ezenname    VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('enm'), NULL);
    l_status      VARCHAR2 (1000)
                      := NVL (l_body_json.get_string ('sts'), NULL);
BEGIN
    --created user
    BEGIN
        SELECT id
          INTO l_userid
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;

    --insert main
    IF l_id IS NOT NULL
    THEN
        --update
        UPDATE T_HURUNGU
           SET photo = NVL (l_photo, photo),
               NAME = NVL (l_NAME, NAME),
               UNE = NVL (l_UNE, UNE),
               TOO = NVL (l_TOO, TOO),
               EZENID = NVL (l_EZENID, EZENID),
               STATUS = NVL (l_STATUS, STATUS),
               EZENNAME = NVL (l_EZENNAME, EZENNAME),
               SYNCED = '0'
         WHERE id = l_id;

        COMMIT;


        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => CONCAT ('update', l_id));
    ELSE
        --insert
        INSERT INTO T_HURUNGU (NAME,
                               PHOTO,
                               UNE,
                               TOO,
                               EZENID,
                               STATUS,
                               EZENNAME)
             VALUES (L_NAME,
                     l_PHOTO,
                     l_UNE,
                     l_TOO,
                     l_EZENID,
                     l_STATUS,
                     l_EZENNAME)
          RETURNING id
               INTO l_id;

        COMMIT;



        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => l_id);
    END IF;


    --insert detail
    --insert file

    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_CRM_W_INSERT_OR_UPDATE;

/
--------------------------------------------------------
--  DDL for Function F_GET_PRODUCTS
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_GET_PRODUCTS" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json      json_object_t := json_object_t (p_body);
    l_token          VARCHAR2 (255) := l_body_json.get_string ('token');
    l_search_text            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('search_text'), NULL);
    l_id             VARCHAR2 (255) := NVL (l_body_json.get_string ('id'), NULL);
     
    l_nme            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('nme'), NULL);
    l_ngj            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('ngj'), NULL);
    l_jin            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('jin'), NULL);
    l_sts            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('sts'), NULL);
                         
    l_trl            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('trl'), NULL);
    l_trln            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('trln'), NULL);
    l_usr            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('usr'), NULL);
    l_cdt            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('cdt'), NULL);

    --pagination
    l_total_row      NUMBER := 0;
    l_total_page     NUMBER := 0;
    l_selected_row   NUMBER := 0;
    p_page_size      NUMBER;
    p_page_number    NUMBER;
    l_page_size      NUMBER;
    l_offset         NUMBER;

    --response
    l_resp           CLOB;
    -- query
    v_qry            VARCHAR2 (4000);
    v_qry_insert     VARCHAR2 (4000);
    v_qry_count      VARCHAR2 (4000);
    v_qry_select     VARCHAR2 (4000);
    v_qry_from       VARCHAR2 (4000);
    --condition
    s_id             VARCHAR2 (32) := ' and 1=1';
    s_pht            VARCHAR2 (255) := ' and 1=1';
    s_nme            VARCHAR2 (255) := ' and 1=1';
    s_ngj            VARCHAR2 (255) := ' and 1=1';
    s_sts            VARCHAR2 (255) := ' and 1=1';
    s_jin            VARCHAR2 (255) := ' and 1=1';
     s_trl            VARCHAR2 (255) := ' and 1=1';
      s_trln            VARCHAR2 (255) := ' and 1=1';
    s_usr            VARCHAR2 (255) := ' and 1=1';
    s_cdt            VARCHAR2 (255) := ' and 1=1';

    --config
    c_dateformat     VARCHAR2 (255) := 'YYYY/MM/DD';
    c_groupby        VARCHAR2 (255) := ' group by ID';
    s_offset         VARCHAR2 (255);
BEGIN
    --pagination
    p_page_size := l_body_json.get_string ('page_size');
    p_page_number := l_body_json.get_string ('page_number');
    l_page_size := NVL (p_page_size, 200);
    l_offset := l_page_size * (NVL (p_page_number, 1) - 1);
    s_offset := ' OFFSET ' || l_offset || ' ROWS
           FETCH NEXT ' || l_page_size || '  ROWS ONLY ';

    -- where condition
    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

   

    IF l_nme IS NOT NULL
    THEN
        s_nme := ' and LOWER(nme) like ''%' || LOWER (l_nme) || '%''';
    END IF;



    IF l_ngj IS NOT NULL
    THEN
        s_ngj := ' and LOWER(ngj) like ''%' || LOWER (l_ngj) || '%''';
    END IF;

    IF l_jin IS NOT NULL
    THEN
        s_jin := ' and LOWER(jin) like ''%' || LOWER (l_jin) || '%''';
    END IF;
    
     IF l_trl IS NOT NULL
    THEN
        s_trl := ' and LOWER(jin) like ''%' || LOWER (l_trl) || '%''';
    END IF;
     IF l_trln IS NOT NULL
    THEN
        s_trln := ' and LOWER(trln) like ''%' || LOWER (l_trln) || '%''';
    END IF;
    


    IF l_sts IS NOT NULL
    THEN
        s_sts := ' and LOWER(sts) like ''%' || LOWER (l_sts) || '%''';
    END IF;

    IF l_cdt IS NOT NULL
    THEN
        s_cdt := ' and LOWER(cdt) like ''%' || LOWER (l_cdt) || '%''';
    END IF;



    v_qry_count :=
           'select count(*) from T_BARAA where deleted = 0 and -1=-1 '
        || s_id
         
        || s_nme
        || s_jin
        || s_ngj
        || s_trl
        || s_trln
        || s_sts
        || s_usr
        || s_cdt
        || ' order by cdt desc';

    EXECUTE IMMEDIATE v_qry_count
        INTO l_total_row;

    --total row ees huudasnii too olno

    --client ruu ilgeeh ugugdul

    v_qry_insert :=
           'insert into t_temp value (select id from T_BARAA   where  deleted = 0 and -1=-1 '
        || s_id
       
        || s_nme
        || s_jin
        || s_ngj
        || s_trl
        || s_trln
        || s_sts
        || s_usr
        || s_cdt
        || ' order by cdt desc'
        || s_offset
        || ')';


    EXECUTE IMMEDIATE v_qry_insert;

    --
    SELECT COUNT (*) INTO l_selected_row FROM T_TEMP;

    l_total_page := TRUNC (l_total_row / l_page_size, 0);

    IF l_total_page * l_page_size < l_total_row
    THEN
        l_total_page := l_total_page + 1;
    END IF;


    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   JSON_OBJECT (
                       'pagination' VALUE
                           JSON_OBJECT (
                               'total_row' VALUE l_total_row,
                               'page_size' VALUE l_page_size,
                               'page_number' VALUE p_page_number,
                               'start_row' VALUE l_offset + 1,
                               'end_row' VALUE l_offset + l_selected_row,
                               'total_page' VALUE l_total_page
                               RETURNING CLOB),
                       'list' VALUE
                           JSON_ARRAYAGG (JSON_OBJECT ('id' VALUE id,                                                       
                                                       'nme' VALUE nme,
                                                       'ngj' VALUE ngj,
                                                       'jin' VALUE jin,
                                                       'sts' VALUE sts,
                                                       'trl' VALUE trl,
                                                       'une' VALUE une,
                                                       'urtug' VALUE urtug,
                                                       'trln' VALUE trln,
                                                       'usr' VALUE usr,
                                                       'cdt' VALUE cdt
                                                       RETURNING CLOB)
                                          RETURNING CLOB)
                       RETURNING CLOB)
               RETURNING CLOB)
      INTO l_resp
      FROM T_BARAA t1 
     WHERE id IN (SELECT ID FROM T_TEMP) order by srt asc;

    COMMIT;
    RETURN l_resp;
END F_GET_PRODUCTS;

/
--------------------------------------------------------
--  DDL for Function F_GET_PRODUCT_IMAGES
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_GET_PRODUCT_IMAGES" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json      json_object_t := json_object_t (p_body);
    l_token          VARCHAR2 (255) := l_body_json.get_string ('token');
    l_search_text            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('search_text'), NULL);
    l_id             VARCHAR2 (255) := NVL (l_body_json.get_string ('id'), NULL);
    l_pht            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('pht'), NULL);
    l_nme            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('nme'), NULL);
    l_ngj            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('ngj'), NULL);
    l_jin            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('jin'), NULL);
    l_sts            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('sts'), NULL);
                         
    l_trl            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('trl'), NULL);
    l_trln            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('trln'), NULL);
    l_usr            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('usr'), NULL);
    l_cdt            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('cdt'), NULL);

    --pagination
    l_total_row      NUMBER := 0;
    l_total_page     NUMBER := 0;
    l_selected_row   NUMBER := 0;
    p_page_size      NUMBER;
    p_page_number    NUMBER;
    l_page_size      NUMBER;
    l_offset         NUMBER;

    --response
    l_resp           CLOB;
    -- query
    v_qry            VARCHAR2 (4000);
    v_qry_insert     VARCHAR2 (4000);
    v_qry_count      VARCHAR2 (4000);
    v_qry_select     VARCHAR2 (4000);
    v_qry_from       VARCHAR2 (4000);
    --condition
    s_id             VARCHAR2 (32) := ' and 1=1';
    s_pht            VARCHAR2 (255) := ' and 1=1';
    s_nme            VARCHAR2 (255) := ' and 1=1';
    s_ngj            VARCHAR2 (255) := ' and 1=1';
    s_sts            VARCHAR2 (255) := ' and 1=1';
    s_jin            VARCHAR2 (255) := ' and 1=1';
     s_trl            VARCHAR2 (255) := ' and 1=1';
      s_trln            VARCHAR2 (255) := ' and 1=1';
    s_usr            VARCHAR2 (255) := ' and 1=1';
    s_cdt            VARCHAR2 (255) := ' and 1=1';

    --config
    c_dateformat     VARCHAR2 (255) := 'YYYY/MM/DD';
    c_groupby        VARCHAR2 (255) := ' group by ID';
    s_offset         VARCHAR2 (255);
BEGIN
    --pagination
    p_page_size := l_body_json.get_string ('page_size');
    p_page_number := l_body_json.get_string ('page_number');
    l_page_size := NVL (p_page_size, 200);
    l_offset := l_page_size * (NVL (p_page_number, 1) - 1);
    s_offset := ' OFFSET ' || l_offset || ' ROWS
           FETCH NEXT ' || l_page_size || '  ROWS ONLY ';

    -- where condition
    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_pht IS NOT NULL
    THEN
        s_pht := ' and LOWER(pht) like ''%' || LOWER (l_pht) || '%''';
    END IF;

    IF l_nme IS NOT NULL
    THEN
        s_nme := ' and LOWER(nme) like ''%' || LOWER (l_nme) || '%''';
    END IF;



    IF l_ngj IS NOT NULL
    THEN
        s_ngj := ' and LOWER(ngj) like ''%' || LOWER (l_ngj) || '%''';
    END IF;

    IF l_jin IS NOT NULL
    THEN
        s_jin := ' and LOWER(jin) like ''%' || LOWER (l_jin) || '%''';
    END IF;
    
     IF l_trl IS NOT NULL
    THEN
        s_trl := ' and LOWER(jin) like ''%' || LOWER (l_trl) || '%''';
    END IF;
     IF l_trln IS NOT NULL
    THEN
        s_trln := ' and LOWER(trln) like ''%' || LOWER (l_trln) || '%''';
    END IF;
    


    IF l_sts IS NOT NULL
    THEN
        s_sts := ' and LOWER(sts) like ''%' || LOWER (l_sts) || '%''';
    END IF;

    IF l_cdt IS NOT NULL
    THEN
        s_cdt := ' and LOWER(cdt) like ''%' || LOWER (l_cdt) || '%''';
    END IF;



    v_qry_count :=
           'select count(*) from T_BARAA where deleted = 0 and -1=-1 '
        || s_id
       
        || s_nme
        || s_jin
        || s_ngj
        || s_trl
        || s_trln
        || s_sts
        || s_usr
        || s_cdt
        || ' order by cdt desc';

    EXECUTE IMMEDIATE v_qry_count
        INTO l_total_row;

    --total row ees huudasnii too olno

    --client ruu ilgeeh ugugdul

    v_qry_insert :=
           'insert into t_temp value (select id from T_BARAA where deleted = 0 and -1=-1 '
        || s_id
        
        || s_nme
        || s_jin
        || s_ngj
        || s_trl
        || s_trln
        || s_sts
        || s_usr
        || s_cdt
        || ' order by cdt desc'
        || s_offset
        || ')';


    EXECUTE IMMEDIATE v_qry_insert;

    --
    SELECT COUNT (*) INTO l_selected_row FROM T_TEMP;

    l_total_page := TRUNC (l_total_row / l_page_size, 0);

    IF l_total_page * l_page_size < l_total_row
    THEN
        l_total_page := l_total_page + 1;
    END IF;


    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   JSON_OBJECT (
                       'pagination' VALUE
                           JSON_OBJECT (
                               'total_row' VALUE l_total_row,
                               'page_size' VALUE l_page_size,
                               'page_number' VALUE p_page_number,
                               'start_row' VALUE l_offset + 1,
                               'end_row' VALUE l_offset + l_selected_row,
                               'total_page' VALUE l_total_page
                               RETURNING CLOB),
                       'list' VALUE
                           JSON_ARRAYAGG (JSON_OBJECT ('id' VALUE id,
                                                       'pht' VALUE pht                                                      
                                                       RETURNING CLOB)
                                          RETURNING CLOB)
                       RETURNING CLOB)
               RETURNING CLOB)
      INTO l_resp
      FROM T_BARAA t1 
     WHERE id IN (SELECT ID FROM T_TEMP) order by srt asc;

    COMMIT;
    RETURN l_resp;
END F_GET_PRODUCT_IMAGES;

/
--------------------------------------------------------
--  DDL for Function F_GET_SHIREE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_GET_SHIREE" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json      json_object_t := json_object_t (p_body);
    l_token          VARCHAR2 (255) := l_body_json.get_string ('token');
    l_id             VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('id'), NULL);
    l_pht            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('pht'), NULL);
    l_nme            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('nme'), NULL);
    l_ngj            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('ngj'), NULL);
    l_rng            VARCHAR2 (100)
                         := NVL (l_body_json.get_string ('rng'), NULL);
     
    l_sts            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('sts'), NULL);
    l_usr            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('usr'), NULL);
    l_cdt            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('cdt'), NULL);
                         
                             --pagination
    l_total_row      NUMBER := 0;
    l_total_page     NUMBER := 0;
    l_selected_row   NUMBER := 0;
    p_page_size      NUMBER;
    p_page_number    NUMBER;
    l_page_size      NUMBER;
    l_offset         NUMBER;
    
    --response
    l_resp           CLOB;
    -- query
    v_qry            VARCHAR2 (4000);
    v_qry_insert     VARCHAR2 (4000);
    v_qry_count      VARCHAR2 (4000);
    v_qry_select     VARCHAR2 (4000);
    v_qry_from       VARCHAR2 (4000);
    --condition
    s_id             VARCHAR2 (32) := ' and 1=1';
    s_pht            VARCHAR2 (255) := ' and 1=1';
    s_nme            VARCHAR2 (255) := ' and 1=1';
    s_ngj            VARCHAR2 (255) := ' and 1=1'; 
    s_sts            VARCHAR2 (1000) := ' and 1=1';
    s_rng            VARCHAR2 (1000) := ' and 1=1';
    s_usr            VARCHAR2 (255) := ' and 1=1';
    s_cdt            VARCHAR2 (255) := ' and 1=1';

    --config
    c_dateformat     VARCHAR2 (255) := 'YYYY/MM/DD';
    c_groupby        VARCHAR2 (255) := ' group by ID';
    s_offset         VARCHAR2 (255);
 
BEGIN
    

    --pagination
    p_page_size := l_body_json.get_string ('page_size');
    p_page_number := l_body_json.get_string ('page_number');
    l_page_size := NVL (p_page_size, 200);
    l_offset := l_page_size * (NVL (p_page_number, 1) - 1);
    s_offset := ' OFFSET ' || l_offset || ' ROWS
           FETCH NEXT ' || l_page_size || '  ROWS ONLY ';

    -- where condition
    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_pht IS NOT NULL
    THEN
        s_pht := ' and LOWER(pht) like ''%' || LOWER (l_pht) || '%''';
    END IF;

    IF l_nme IS NOT NULL
    THEN
        s_nme := ' and LOWER(nme) like ''%' || LOWER (l_nme) || '%''';
    END IF;

   

    IF l_ngj IS NOT NULL
    THEN
        s_ngj := ' and LOWER(ngj) like ''%' || LOWER (l_ngj) || '%''';
    END IF;

    IF l_rng IS NOT NULL
    THEN
        s_rng := ' and LOWER(rng) like ''%' || LOWER (l_rng) || '%''';
    END IF;

    
    IF l_sts IS NOT NULL
    THEN
        s_sts := ' and LOWER(sts) like ''%' || LOWER (l_sts) || '%''';
    END IF;

    IF l_cdt IS NOT NULL
    THEN
        s_cdt := ' and LOWER(cdt) like ''%' || LOWER (l_cdt) || '%''';
    END IF;



    v_qry_count :=
           'select count(*) from T_SHIREE where deleted=0 and -1=-1 '
        || s_id
        || s_pht
        || s_nme
        || s_ngj
        || s_rng
        || s_sts         
        || s_cdt
        || ' order by cdt desc';

    EXECUTE IMMEDIATE v_qry_count
        INTO l_total_row;

    --total row ees huudasnii too olno

    --client ruu ilgeeh ugugdul

    v_qry_insert :=
           'insert into t_temp value (select id from T_SHIREE where deleted=0 and -1=-1 '
         || s_id
        || s_pht
        || s_nme
        || s_ngj
        || s_rng
        || s_sts         
        || s_cdt
        || ' order by cdt desc'
        || s_offset
        || ')';


    EXECUTE IMMEDIATE v_qry_insert;

    --
    SELECT COUNT (*) INTO l_selected_row FROM T_TEMP;

    l_total_page := TRUNC (l_total_row / l_page_size, 0);

    IF l_total_page * l_page_size < l_total_row
    THEN
        l_total_page := l_total_page + 1;
    END IF;


    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   JSON_OBJECT (
                       'pagination' VALUE
                           JSON_OBJECT (
                               'total_row' VALUE l_total_row,
                               'page_size' VALUE l_page_size,
                               'page_number' VALUE p_page_number,
                               'start_row' VALUE l_offset + 1,
                               'end_row' VALUE l_offset + l_selected_row,
                               'total_page' VALUE l_total_page
                               RETURNING CLOB),
                       'list' VALUE
                           JSON_ARRAYAGG (JSON_OBJECT ('id' VALUE id,
                                                       'pht' VALUE null,
                                                       'nme' VALUE nme,
                                                       'ngj' VALUE ngj,
                                                       'rng' VALUE rng,
                                                       'sts' VALUE sts,
                                                       'qrid' VALUE qrid,
                                                       'qrurl' VALUE qrurl,
                                                       'usr' VALUE usr,
                                                       'cdt' VALUE cdt
                                                       RETURNING CLOB)
                                          RETURNING CLOB)
                       RETURNING CLOB)
               RETURNING CLOB)
      INTO l_resp
      FROM T_SHIREE t1
     WHERE id IN (SELECT ID FROM T_TEMP);

    COMMIT;
    RETURN l_resp;
END F_GET_SHIREE;

/
--------------------------------------------------------
--  DDL for Function F_GLBL_CHANGEPASSWORD
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_GLBL_CHANGEPASSWORD" (
    p_body   IN CLOB)
    RETURN CLOB
AS
    l_resp          CLOB;
    l_body_json     json_object_t := json_object_t (p_body);
    l_token         VARCHAR2 (255) := l_body_json.get_string ('token');
    l_password      VARCHAR2 (1000) := l_body_json.get_string ('password');
    l_confirm       VARCHAR2 (1000) := l_body_json.get_string ('confirm');
    l_oldpassword   VARCHAR2 (1000) := l_body_json.get_string ('oldpassword');
    l_userid        VARCHAR2 (255);
    s_password      VARCHAR2 (1000);
BEGIN
    --token haij olno
    BEGIN
             SELECT ID
               INTO l_userid
               FROM T_USERS
              WHERE token = l_token
        FETCH FIRST 1 ROWS ONLY;
    EXCEPTION
        WHEN NO_DATA_FOUND
        THEN
            SELECT JSON_OBJECT (
                       'status' VALUE 'error',
                       'code' VALUE 400,
                       'message' VALUE
                           'Токены хугацаа дууссан байна. Дахин нэвтэрнэ үү',
                       'result' VALUE 'Token Expired '
                       RETURNING CLOB)
              INTO l_resp
              FROM DUAL;

            l_userid := NULL;
        WHEN OTHERS
        THEN
            SELECT JSON_OBJECT (
                       'status' VALUE 'error',
                       'code' VALUE 400,
                       'message' VALUE
                           'Хэрэглэгч олдсонгүй. Зөвшөөрөгдөөгүй хандалт',
                       'result' VALUE 'Other exception '
                       RETURNING CLOB)
              INTO l_resp
              FROM DUAL;

            l_userid := NULL;
    END;

    -- huuchin pass haritsuulna
    IF l_userid IS NOT NULL
    THEN
        BEGIN
                 SELECT password
                   INTO s_password
                   FROM T_USERS
                  WHERE TOKEN = l_token AND id = l_userid
            FETCH FIRST 1 ROWS ONLY;
        EXCEPTION
            WHEN NO_DATA_FOUND
            THEN
                SELECT JSON_OBJECT (
                           'status' VALUE 'error',
                           'code' VALUE 400,
                           'message' VALUE
                               'Токены хугацаа дууссан байна. Дахин нэвтэрнэ үү',
                           'result' VALUE 'Token Expired '
                           RETURNING CLOB)
                  INTO l_resp
                  FROM DUAL;

                s_password := NULL;
            WHEN OTHERS
            THEN
                SELECT JSON_OBJECT (
                           'status' VALUE 'error',
                           'code' VALUE 400,
                           'message' VALUE
                               'Хэрэглэгч олдсонгүй. Зөвшөөрөгдөөгүй хандалт',
                           'result' VALUE 'Other exception '
                           RETURNING CLOB)
                  INTO l_resp
                  FROM DUAL;

                s_password := NULL;
        END;
    END IF;

    --shine pass olgono
    IF s_password IS NOT NULL
    THEN
        IF s_password = l_oldpassword
        THEN
            BEGIN
                UPDATE T_USERS
                   SET password = l_password
                 WHERE id = l_userid;

                SELECT JSON_OBJECT ('status' VALUE 'success',
                                    'code' VALUE 200,
                                    'message' VALUE 'Амжилттай'
                                    RETURNING CLOB)
                  INTO l_resp
                  FROM DUAL;
            EXCEPTION
                WHEN OTHERS
                THEN
                    SELECT JSON_OBJECT (
                               'status' VALUE 'error',
                               'code' VALUE 400,
                               'message' VALUE
                                   'Нууц үгийг сольж чадсангүй',
                               'result' VALUE 'Other exception '
                               RETURNING CLOB)
                      INTO l_resp
                      FROM DUAL;
            END;
        --pass taarahgui bol
        ELSE
            SELECT JSON_OBJECT (
                       'status' VALUE 'error',
                       'code' VALUE 400,
                       'message' VALUE
                           'Хуучин нууц үг буруу байна',
                       'result' VALUE 'Other exception '
                       RETURNING CLOB)
              INTO l_resp
              FROM DUAL;
        END IF;
    END IF;

    RETURN l_resp;
END F_GLBL_CHANGEPASSWORD;

/
--------------------------------------------------------
--  DDL for Function F_HUULGA
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_HUULGA" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp           CLOB;
    l_body_json      json_object_t := json_object_t (p_body);
    l_token          VARCHAR2 (255) := l_body_json.get_string ('token');
    l_userid         VARCHAR2 (255);
    l_username       VARCHAR2 (255);
    --payload
    l_id             VARCHAR2 (255) := NVL (l_body_json.get_string ('id'), NULL);
    l_ognoo          VARCHAR2 (255) := NVL (l_body_json.get_string ('ognoo'), NULL);
    l_baraaner       VARCHAR2 (255) := NVL (l_body_json.get_string ('baraaner'), NULL);
    l_too            VARCHAR2 (255) := NVL (l_body_json.get_string ('too'), NULL);
    l_une            VARCHAR2 (255) := NVL (l_body_json.get_string ('une'), NULL);
    l_niitune        VARCHAR2 (255) := NVL (l_body_json.get_string ('niitune'), NULL);
    l_ajiltan        VARCHAR2 (255) := NVL (l_body_json.get_string ('ajiltan'), NULL);
    l_negj           VARCHAR2 (255) := NVL (l_body_json.get_string ('negj'), NULL);
    l_shiree         VARCHAR2 (255) := NVL (l_body_json.get_string ('shiree'), NULL);
    l_utga           VARCHAR2 (255) := NVL (l_body_json.get_string ('utga'), NULL);
    l_tuluw          VARCHAR2 (255) := NVL (l_body_json.get_string ('tuluw'), NULL);
    --pagination
    l_total_row      NUMBER := 0;
    l_total_page     NUMBER := 0;
    l_selected_row   NUMBER := 0;
    p_page_size      NUMBER;
    p_page_number    NUMBER;
    l_page_size      NUMBER;
    l_offset         NUMBER;
    --config
    c_dateformat     VARCHAR2 (255) := 'YYYY/MM/DD';
    c_groupby        VARCHAR2 (255) := ' group by ID';
    s_offset         VARCHAR2 (255);

    -- query
    v_qry            VARCHAR2 (4000);
    v_qry_insert     VARCHAR2 (4000);
    v_qry_count      VARCHAR2 (4000);
    v_qry_select     VARCHAR2 (4000);
    v_qry_from       VARCHAR2 (4000);
    --condition
    s_id             VARCHAR2 (255) := ' and 1=1';
    s_ognoo          VARCHAR2 (255) := ' and 1=1';
    s_baraaner       VARCHAR2 (255) := ' and 1=1';
    s_too            VARCHAR2 (255) := ' and 1=1';
    s_une            VARCHAR2 (255) := ' and 1=1';
    s_niitune        VARCHAR2 (255) := ' and 1=1';
    s_ajiltan        VARCHAR2 (255) := ' and 1=1';
    s_negj           VARCHAR2 (255) := ' and 1=1';
    s_shiree         VARCHAR2 (255) := ' and 1=1';
    s_utga           VARCHAR2 (255) := ' and 1=1';
    s_tuluw          VARCHAR2 (255) := ' and 1=1';
BEGIN
    --pagination
    p_page_size := l_body_json.get_string ('page_size');
    p_page_number := l_body_json.get_string ('page_number');
    l_page_size := NVL (p_page_size, 20);
    l_offset := l_page_size * (NVL (p_page_number, 1) - 1);
    s_offset := ' OFFSET ' || l_offset || ' ROWS
           FETCH NEXT ' || l_page_size || '  ROWS ONLY ';

    -- where condition
    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_ognoo IS NOT NULL
    THEN
        s_ognoo := ' and LOWER(ognoo) like ''%' || LOWER (l_ognoo) || '%''';
    END IF;

    IF l_baraaner IS NOT NULL
    THEN
        s_baraaner :=
            ' and LOWER(productname) like ''%' || LOWER (l_baraaner) || '%''';
    END IF;

    IF l_too IS NOT NULL
    THEN
        s_too := ' and LOWER(producttoo) like ''%' || LOWER (l_too) || '%''';
    END IF;

    IF l_une IS NOT NULL
    THEN
        s_une := ' and LOWER(productune) like ''%' || LOWER (l_une) || '%''';
    END IF;

    IF l_niitune IS NOT NULL
    THEN
        s_niitune :=
            ' and LOWER(totalprice) like ''%' || LOWER (l_niitune) || '%''';
    END IF;


    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_ajiltan IS NOT NULL
    THEN
        s_ajiltan :=
            ' and LOWER(username) like ''%' || LOWER (l_ajiltan) || '%''';
    END IF;

    IF l_negj IS NOT NULL
    THEN
        s_negj := ' and LOWER(haana) like ''%' || LOWER (l_negj) || '%''';
    END IF;

    IF l_shiree IS NOT NULL
    THEN
        s_shiree :=
            ' and LOWER(shireename) like ''%' || LOWER (l_shiree) || '%''';
    END IF;

    IF l_utga IS NOT NULL
    THEN
        s_utga := ' and LOWER(utga) like ''%' || LOWER (l_utga) || '%''';
    END IF;

    IF l_shiree IS NOT NULL
    THEN
        s_shiree :=
            ' and LOWER(shireename) like ''%' || LOWER (l_shiree) || '%''';
    END IF;

    IF l_tuluw IS NOT NULL
    THEN
        s_tuluw := ' and LOWER(zarsan) like ''%' || LOWER (l_tuluw) || '%''';
    END IF;



    v_qry_count :=
           'select count(*) from T_ORDER where -1=-1 '
        || s_id
        || s_ognoo
        || s_baraaner
        || s_too
        || s_une
        || s_niitune
        || s_ajiltan
        || s_negj
        || s_shiree
        || s_utga
        || s_tuluw
        || ' order by ognoo desc';

    EXECUTE IMMEDIATE v_qry_count
        INTO l_total_row;

    --total row ees huudasnii too olno

    --client ruu ilgeeh ugugdul

    v_qry_insert :=
           'insert into t_temp value (select id from T_ORDER where -1=-1 '
         || s_id
        || s_ognoo
        || s_baraaner
        || s_too
        || s_une
        || s_niitune
        || s_ajiltan
        || s_negj
        || s_shiree
        || s_utga
        || s_tuluw
        || ' order by ognoo desc'
        || s_offset
        || ')';


    EXECUTE IMMEDIATE v_qry_insert;


    --get username, userid from table of users;
    BEGIN
        SELECT id, name
          INTO l_userid, l_username
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;

    --pagination sub section
    SELECT COUNT (*) INTO l_selected_row FROM T_TEMP;

    l_total_page := TRUNC (l_total_row / l_page_size, 0);

    IF l_total_page * l_page_size < l_total_row
    THEN
        l_total_page := l_total_page + 1;
    END IF;

      SELECT JSON_OBJECT (
                 'status' VALUE 'success',
                 'code' VALUE 200,
                 'message' VALUE 'Амжилттай',
                 'result' VALUE
                     JSON_OBJECT (
                         'pagination' VALUE
                             JSON_OBJECT (
                                 'total_row' VALUE l_total_row,
                                 'page_size' VALUE l_page_size,
                                 'page_number' VALUE p_page_number,
                                 'start_row' VALUE l_offset + 1,
                                 'end_row' VALUE l_offset + l_selected_row,
                                 'total_page' VALUE l_total_page
                                 RETURNING CLOB),
                         'list' VALUE
                             JSON_ARRAYAGG (
                                 JSON_OBJECT (
                                     'id' VALUE id,
                                     'ognoo' VALUE ognoo,
                                     'shireeid' VALUE shireeid,
                                     'shireename' VALUE shireename,
                                     'haana' VALUE haana,
                                     'userid' VALUE userid,
                                     'username' VALUE username,
                                     'pairid' VALUE pairid,
                                     'productid' VALUE productid,
                                     'productname' VALUE productname,
                                     'productune' VALUE productune,
                                     'producturtug' VALUE producturtug,
                                     'ordereddate' VALUE ordereddate,
                                     'producttoo' VALUE producttoo,
                                     'totalprice' VALUE totalprice,
                                     'zarsan' VALUE zarsan,
                                     'synced' VALUE synced,
                                     'synceddate' VALUE synceddate,
                                     'lastreactiondate' VALUE lastreactiondate,
                                     'shireeprice' VALUE shireeprice,
                                     'utga' VALUE utga
                                     RETURNING CLOB)
                                 RETURNING CLOB)
                         RETURNING CLOB)
                 RETURNING CLOB)
        INTO l_resp
        FROM T_ORDER t1
       WHERE id IN (SELECT ID FROM T_TEMP)
    ORDER BY t1.ognoo DESC;



    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_HUULGA;

/
--------------------------------------------------------
--  DDL for Function F_ORDER_INSERT
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_ORDER_INSERT" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp             CLOB;
    l_body_json        json_object_t := json_object_t (p_body);
    l_token            VARCHAR2 (255) := l_body_json.get_string ('token');
    l_userid           VARCHAR2 (255);
    l_username         VARCHAR2 (255);

    --payload

    l_products         json_array_t := l_body_json.get_array ('products');
    l_product          json_object_t;

    l_shireeid         VARCHAR2 (255) := l_body_json.get_string ('shireeid');
    l_haana            VARCHAR2 (255) := l_body_json.get_string ('haana');
    l_shireename       VARCHAR2 (255) := l_body_json.get_string ('shireename');
    l_shireeprice       VARCHAR2 (255) := l_body_json.get_number ('shireeprice');
    l_pairno           VARCHAR2 (32);
    l_itemid           VARCHAR2 (255);
    l_itemname         VARCHAR2 (255);
    l_itemune          VARCHAR2 (255);
    l_itemtoo          VARCHAR2 (255);
    l_itemdate         VARCHAR2 (255);
    l_itemdun          VARCHAR2 (255);
    l_paidno           VARCHAR2 (32);
    l_itemtotalprice   VARCHAR2 (255);
BEGIN
    --get username, userid from table of users;
    BEGIN
        SELECT id, name
          INTO l_userid, l_username
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;

    --insert datas to table
    l_pairno := SYS_GUID ();

    FOR indx IN 0 .. l_products.get_size - 1
    LOOP
        l_product := TREAT (l_products.get (indx) AS json_object_t);
        l_itemid := l_product.get_string ('itemid');
        l_itemname := l_product.get_string ('itemname');
        l_itemune := l_product.get_string ('itemune');
        l_itemtoo := l_product.get_string ('itemtoo');
        l_itemdate := l_product.get_string ('itemdate');
        l_itemdun := l_product.get_string ('itemdun');
        l_itemtotalprice := TO_NUMBER (l_itemtoo) * TO_NUMBER (l_itemune);

        INSERT INTO T_ORDER (PRODUCTID,
                             PRODUCTNAME,
                             PRODUCTUNE,
                             PRODUCTTOO,
                             TOTALPRICE,
                             SHIREEID,
                             SHIREENAME,
                             SHIREEPRICE,
                             ORDEREDDATE,
                             USERNAME,
                             USERID,
                             PAIRID,
                             HAANA)
             VALUES (l_itemid,
                     l_itemname,
                     l_itemune,
                     l_itemtoo,
                     l_itemtotalprice,
                     l_shireeid,
                     l_shireename,
                     l_shireeprice,
                     l_itemdate,
                     l_username,
                     l_userid,
                     l_pairno,
                     l_haana);
    END LOOP;


    l_resp :=
        get_response_json (p_code           => 200,
                           p_message_code   => 'success',
                           p_result         => p_body);
    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_ORDER_INSERT;

/
--------------------------------------------------------
--  DDL for Function F_ORLOGO_INSERT
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_ORLOGO_INSERT" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp             CLOB;
    l_body_json        json_object_t := json_object_t (p_body);
    l_token            VARCHAR2 (255) := l_body_json.get_string ('token');
    l_userid           VARCHAR2 (255);
    l_username         VARCHAR2 (255);
    --payload
    l_utga               VARCHAR2 (255) := l_body_json.get_string ('utga');
    l_totalprice       VARCHAR2 (255) := l_body_json.get_number ('totalprice');
    l_tooshirheg       VARCHAR2 (255) := l_body_json.get_number ('tooshirheg');
    l_products           json_array_t := l_body_json.get_array ('orlogo');
    l_product          json_object_t;
    l_pairno           VARCHAR2 (32);
    l_itemid           VARCHAR2 (255);
    l_itemname         VARCHAR2 (255);
    l_itemune          VARCHAR2 (255);
    l_itemtoo          VARCHAR2 (255);
    l_itemdate         VARCHAR2 (255);
    l_itemdun          VARCHAR2 (255); 
    l_itemtotalprice   VARCHAR2 (255);
BEGIN
    --get username, userid from table of users;
    BEGIN
        SELECT id, name
          INTO l_userid, l_username
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;

    --insert datas to table
    l_pairno := SYS_GUID ();

    FOR indx IN 0 .. l_products.get_size - 1
    LOOP
        l_product := TREAT (l_products.get (indx) AS json_object_t);
        l_itemid := l_product.get_string ('productID');
        l_itemname := l_product.get_string ('productName');
        l_itemune := l_product.get_string ('une');
        l_itemtoo := l_product.get_string ('too');
        l_itemtotalprice := TO_NUMBER (l_itemtoo) * TO_NUMBER (l_itemune);

        INSERT INTO T_ORDER (PRODUCTID,
                             PRODUCTNAME,
                             PRODUCTUNE,
                             PRODUCTTOO,
                             TOTALPRICE,                            
                             USERNAME,
                             USERID,
                             PAIRID,
                             UTGA,
                             zarsan)
             VALUES (l_itemid,
                     l_itemname,
                     l_itemune,
                     l_itemtoo,
                     l_itemtotalprice,                    
                     l_username,
                     l_userid,
                     l_pairno,
                     l_utga,
                     'Таталт');
    END LOOP;


    l_resp :=
        get_response_json (p_code           => 200,
                           p_message_code   => 'success',
                           p_result         => p_body);
    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_ORLOGO_INSERT;

/
--------------------------------------------------------
--  DDL for Function F_PRODUCT_DELETE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_PRODUCT_DELETE" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_resp        CLOB;
    l_id          VARCHAR2 (255);
BEGIN
    l_body := p_body;
    l_id := l_body_json.get_string ('id');

    UPDATE T_BARAA
       SET STS = 'Устгагдсан', deleted = '1', synced = '0'
     WHERE ID = l_id;

    COMMIT;

    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   l_id || '-тай өгөгдлийг устгав'
               RETURNING CLOB)
      INTO l_resp
      FROM DUAL;

    RETURN l_resp;
END F_PRODUCT_DELETE;

/
--------------------------------------------------------
--  DDL for Function F_PRODUCT_INSERT_OR_UPDATE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_PRODUCT_INSERT_OR_UPDATE" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (32) := l_body_json.get_string ('token');
    l_userid      VARCHAR2 (255);

    --payload
    l_id          VARCHAR2 (32) := NVL (l_body_json.get_string ('id'), NULL);
       l_pht          CLOB:= NVL (l_body_json.get_clob ('pht'), NULL);
    l_nme         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('nme'), NULL);
                      l_une         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('une'), NULL);
                      l_urtug         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('urtug'), NULL);
    l_trl         VARCHAR2 (32)
                      := NVL (l_body_json.get_string ('trl'), NULL);
    l_trln         VARCHAR2 (32)
                      := NVL (l_body_json.get_string ('trln'), NULL);
    l_jin         VARCHAR2 (32)
                      := NVL (l_body_json.get_string ('jin'), NULL);
    l_ngj         VARCHAR2 (32) := NVL (l_body_json.get_string ('ngj'), NULL);
BEGIN
    --created user
    BEGIN
        SELECT id
          INTO l_userid
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;
    IF l_trl is not null 
    THEN
    select nme into l_trln from T_BARAA_TURUL where ID = l_trl;
    END IF;
    --insert main
    IF l_id IS NOT NULL
    THEN
        --update
        UPDATE T_BARAA
           SET nme = NVL (l_nme, nme), 
           une = NVL (l_une, une),
           urtug = NVL (l_urtug, urtug),
             pht = NVL (l_pht, pht),
           ngj = NVL (l_ngj, ngj),
           trl = NVL (l_trl, trl),
           jin = NVL (l_jin, jin),
           trln = NVL (l_trln, trln),
           synced = '0'
         WHERE id = l_id;

        COMMIT;


        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => CONCAT ('update', l_id));
    ELSE
        --insert
        INSERT INTO T_BARAA (nme, ngj, trl, trln, jin, pht, une, urtug)
             VALUES (L_NME, l_NGJ, l_trl, l_trln, l_jin, l_pht, l_une, l_urtug)
          RETURNING id
               INTO l_id;

        COMMIT;



        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => l_id);
    END IF;


    --insert detail
    --insert file

    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_PRODUCT_INSERT_OR_UPDATE;

/
--------------------------------------------------------
--  DDL for Function F_SHIREE_DELETE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_SHIREE_DELETE" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_resp        CLOB;
    l_id          VARCHAR2 (255);
BEGIN
    l_body := p_body;
    l_id := l_body_json.get_string ('id');

    UPDATE T_SHIREE
    SET STS='Устгагдсан', DELETED='1', SYNCED = '0'
          WHERE ID = l_id;
    COMMIT;

    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   l_id || '-тай өгөгдлийг устгав'
               RETURNING CLOB)
      INTO l_resp
      FROM DUAL;

    RETURN l_resp;
END F_SHIREE_DELETE;

/
--------------------------------------------------------
--  DDL for Function F_SHIREE_INSERT_OR_UPDATE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_SHIREE_INSERT_OR_UPDATE" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (32) := l_body_json.get_string ('token');
    l_userid      VARCHAR2 (255);


    --payload
    l_id          VARCHAR2 (32) := NVL (l_body_json.get_string ('id'), NULL);
    l_nme        VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('nme'), NULL);
    l_ngj         VARCHAR2 (32) := NVL (l_body_json.get_string ('ngj'), NULL);
     
BEGIN
    --created user
    BEGIN
        SELECT id
          INTO l_userid
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;

    --insert main
    IF l_id IS NOT NULL
    THEN
        --update
        UPDATE T_SHIREE
           SET  
               nme = NVL (l_nme, nme),
               ngj = NVL (l_ngj, ngj),
               synced = '0'               
         WHERE id = l_id;

        COMMIT;


        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => CONCAT ('update', l_id));
    ELSE
        --insert
        INSERT INTO T_SHIREE (nme, ngj)
             VALUES (L_NME,
                     l_NGJ)
          RETURNING id
               INTO l_id;

        COMMIT;



        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => l_id);
    END IF;


    --insert detail
    --insert file

    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_SHIREE_INSERT_OR_UPDATE;

/
--------------------------------------------------------
--  DDL for Function F_ULDEGDEL
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_ULDEGDEL" (p_body IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (255) := l_body_json.get_string ('token');
    l_userid      VARCHAR2 (255);
    l_username    VARCHAR2 (255);
    --payload
    l_ognoo       VARCHAR2 (255)
        := NVL (l_body_json.get_string ('ognoo'), '3000-01-01 01:01:01');
    l_orlogo      NUMBER;
    l_zarlaga     NUMBER;
    l_balance     NUMBER;
BEGIN
    BEGIN
        IF LENGTH (l_ognoo) = 10
        THEN
            l_ognoo := CONCAT (l_ognoo, ' 23:59:59');
        END IF;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_ognoo := '3000-01-01 01:01:01';
    END;

    --get username, userid from table of users;
    BEGIN
        SELECT id, name
          INTO l_userid, l_username
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;

    FOR o IN (  SELECT ID,
                       NME,
                       UNE,
                       URTUG,
                       SRT
                  FROM T_BARAA
                 WHERE deleted = '0' and STS = 'Идэвхтэй'
              ORDER BY SRT DESC)
    LOOP
        --buh baraa davtaad orood irsen

        INSERT INTO T_PRODUCTBALANCE (ID,
                                      NAME,
                                      PRICE,
                                      PIECE,
                                      TOTAL,
                                      SRT)
                 VALUES (
                     o.id,
                     o.nme,
                     o.une,
                       TO_NUMBER (
                           NVL (
                               (SELECT SUM (producttoo)
                                  FROM T_ORDER
                                 WHERE     zarsan = 'Таталт' and deleted = '0'
                                       AND ognoo <= l_ognoo
                                       AND PRODUCTID = o.id),
                               0))
                     - TO_NUMBER (
                           NVL (
                               (SELECT SUM (producttoo)
                                  FROM T_ORDER
                                 WHERE     zarsan = 'Зарсан'  and deleted = '0'
                                       AND ognoo <= l_ognoo
                                       AND PRODUCTID = o.id),
                               0)),
                     0 * TO_NUMBER (o.une),
                     o.SRT);
    END LOOP;

      SELECT JSON_OBJECT (
                 'status' VALUE 'success',
                 'code' VALUE 200,
                 'message' VALUE 'Амжилттай',
                 'result' VALUE
                     JSON_OBJECT (
                         'list' VALUE
                             JSON_ARRAYAGG (JSON_OBJECT ('id' VALUE id,
                                                         'name' VALUE NAME,
                                                         'price' VALUE PRICE,
                                                         'piece' VALUE PIECE,
                                                         'total' VALUE TOTAL,
                                                         'srt' VALUE SRT
                                                         RETURNING CLOB)
                                            RETURNING CLOB)
                         RETURNING CLOB)
                 RETURNING CLOB)
        INTO l_resp
        FROM T_PRODUCTBALANCE
    ORDER BY SRT DESC;



    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_ULDEGDEL;

/
--------------------------------------------------------
--  DDL for Function F_USR_DELETE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_USR_DELETE" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body                 CLOB;
    l_body_json            json_object_t := json_object_t (p_body);
    l_resp CLOB;
    l_id VARCHAR2(255);
BEGIN
    l_body := p_body;
    l_id := l_body_json.get_string('id');          
    
     UPDATE T_USERS  set deleted = '1', synced = '0' WHERE ID = l_id;   
    COMMIT;    
    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE l_id || '-тай өгөгдлийг устгав' Returning clob)
      INTO l_resp
      FROM dual; 
    RETURN l_resp;
END F_USR_DELETE;

/
--------------------------------------------------------
--  DDL for Function F_USR_GET
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_USR_GET" (p_body IN CLOB)
    RETURN CLOB
AS
    l_body_json      json_object_t := json_object_t (p_body);
    --pagination
    l_total_row      NUMBER := 0;
    l_total_page     NUMBER := 0;
    l_selected_row   NUMBER := 0;
    p_page_size      NUMBER;
    p_page_number    NUMBER;
    l_page_size      NUMBER;
    l_offset         NUMBER;
    --payload
    l_token          VARCHAR2 (255) := l_body_json.get_string ('token');
    l_id             VARCHAR2 (32)
                         := NVL (l_body_json.get_string ('id'), NULL);
    l_sqd            VARCHAR2 (32)
                         := NVL (l_body_json.get_string ('sqd'), NULL);
    l_lnm            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('lnm'), NULL);
    l_fnm            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('fnm'), NULL);
    l_rnk            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('rnk'), NULL);
    l_unm            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('unm'), NULL);
    l_sts            VARCHAR2 (32)
                         := NVL (l_body_json.get_string ('sts'), NULL);
    l_rle            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('rle'), NULL);
    l_pht            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('pht'), NULL);
    l_usr            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('usr'), NULL);
    l_cdt            VARCHAR2 (255)
                         := NVL (l_body_json.get_string ('cdt'), NULL);
    --response
    l_resp           CLOB;
    -- query
    v_qry            VARCHAR2 (4000);
    v_qry_insert     VARCHAR2 (4000);
    v_qry_count      VARCHAR2 (4000);
    v_qry_select     VARCHAR2 (4000);
    v_qry_from       VARCHAR2 (4000);
    --condition
    s_id             VARCHAR2 (32) := ' and 1=1';
    s_sqd            VARCHAR2 (255) := ' and 1=1';
    s_lnm            VARCHAR2 (255) := ' and 1=1';
    s_fnm            VARCHAR2 (255) := ' and 1=1';
    s_rnk            VARCHAR2 (255) := ' and 1=1';
    s_unm            VARCHAR2 (255) := ' and 1=1';
    s_sts            VARCHAR2 (255) := ' and 1=1';
    s_rle            VARCHAR2 (255) := ' and 1=1';
    s_pht            VARCHAR2 (255) := ' and 1=1';
    s_usr            VARCHAR2 (255) := ' and 1=1';
    s_cdt            VARCHAR2 (255) := ' and 1=1';
    --config
    c_dateformat     VARCHAR2 (255) := 'YYYY/MM/DD';
    c_groupby        VARCHAR2 (255) := ' group by ID';
    s_offset         VARCHAR2 (255);
BEGIN
    --pagination
    p_page_size := l_body_json.get_string ('page_size');
    p_page_number := l_body_json.get_string ('page_number');
    l_page_size := NVL (p_page_size, 50);
    l_offset := l_page_size * (NVL (p_page_number, 1) - 1);
    s_offset := ' OFFSET ' || l_offset || ' ROWS
           FETCH NEXT ' || l_page_size || '  ROWS ONLY ';

    -- where condition
    IF l_id IS NOT NULL
    THEN
        s_id := ' and LOWER(id) like ''%' || LOWER (l_id) || '%''';
    END IF;

    IF l_sqd IS NOT NULL
    THEN
        s_sqd := ' and LOWER(sqd) like ''%' || LOWER (l_sqd) || '%''';
    END IF;

    IF l_lnm IS NOT NULL
    THEN
        s_lnm := ' and LOWER(lnm) like ''%' || LOWER (l_lnm) || '%''';
    END IF;

    IF l_fnm IS NOT NULL
    THEN
        s_fnm := ' and LOWER(fnm) like ''%' || LOWER (l_fnm) || '%''';
    END IF;

    IF l_rnk IS NOT NULL
    THEN
        s_rnk := ' and LOWER(rnk) like ''%' || LOWER (l_rnk) || '%''';
    END IF;

    IF l_unm IS NOT NULL
    THEN
        s_unm := ' and LOWER(unm) like ''%' || LOWER (l_unm) || '%''';
    END IF;


    IF l_sts IS NOT NULL
    THEN
        s_sts := ' and LOWER(sts) like ''%' || LOWER (l_sts) || '%''';
    END IF;

    IF l_rle IS NOT NULL
    THEN
        s_rle := ' and LOWER(rle) like ''%' || LOWER (l_rle) || '%''';
    END IF;

    IF l_pht IS NOT NULL
    THEN
        s_pht := ' and LOWER(pht) like ''%' || LOWER (l_pht) || '%''';
    END IF;



    IF l_cdt IS NOT NULL
    THEN
        s_cdt := ' and LOWER(cdt) like ''%' || LOWER (l_cdt) || '%''';
    END IF;


    IF l_usr IS NOT NULL
    THEN
        s_usr :=
               ' and  LOWER(HELPER.userShowName(usr)) like ''%'
            || LOWER (l_usr)
            || '%''';
    END IF;

    v_qry_count :=
           'select count(*) from T_USERS where  deleted =0 and -1=-1 '
        || s_id
        || s_sqd
        || s_lnm
        || s_fnm
        || s_rnk
        || s_unm
        || s_sts
        || s_rle
        || s_pht
        || s_cdt
        || s_usr
        || ' order by cdt desc';

    EXECUTE IMMEDIATE v_qry_count
        INTO l_total_row;

    --total row ees huudasnii too olno

    --client ruu ilgeeh ugugdul

    v_qry_insert :=
           'insert into t_temp value (select id from T_USERS where  deleted = 0 and -1=-1 '
        || s_id
        || s_sqd
        || s_lnm
        || s_fnm
        || s_rnk
        || s_unm
        || s_sts
        || s_rle
        || s_pht
        || s_cdt
        || s_usr
        || ' order by cdt desc'
        || s_offset
        || ')';


    EXECUTE IMMEDIATE v_qry_insert;

    --
    SELECT COUNT (*) INTO l_selected_row FROM T_TEMP;

    l_total_page := TRUNC (l_total_row / l_page_size, 0);

    IF l_total_page * l_page_size < l_total_row
    THEN
        l_total_page := l_total_page + 1;
    END IF;


    SELECT JSON_OBJECT (
               'status' VALUE 'success',
               'code' VALUE 200,
               'message' VALUE 'Амжилттай',
               'result' VALUE
                   JSON_OBJECT (
                       'pagination' VALUE
                           JSON_OBJECT (
                               'total_row' VALUE l_total_row,
                               'page_size' VALUE l_page_size,
                               'page_number' VALUE p_page_number,
                               'start_row' VALUE l_offset + 1,
                               'end_row' VALUE l_offset + l_selected_row,
                               'total_page' VALUE l_total_page
                               RETURNING CLOB),
                       'list' VALUE
                           JSON_ARRAYAGG (
                               JSON_OBJECT (
                                   'id' VALUE id,
                                   'sqd' VALUE sqd,
                                   'lnm' VALUE lnm,
                                   'fnm' VALUE fnm,
                                   'rnk' VALUE rnk,
                                   'unm' VALUE unm,
                                   'sts' VALUE sts,
                                   'rle' VALUE rle,
                                   'pht' VALUE pht,
                                   'usr' VALUE fnm,
                                   'cdt' VALUE cdt
                                   RETURNING CLOB)
                               RETURNING CLOB)
                       RETURNING CLOB)
               RETURNING CLOB)
      INTO l_resp
      FROM T_USERS t1
     WHERE id IN (SELECT ID FROM T_TEMP);

    COMMIT;
    RETURN l_resp;
END F_USR_GET;

/
--------------------------------------------------------
--  DDL for Function F_USR_INSERT_OR_UPDATE
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."F_USR_INSERT_OR_UPDATE" (
    p_body   IN CLOB)
    RETURN CLOB
AS
    --Main
    l_resp        CLOB;
    l_body_json   json_object_t := json_object_t (p_body);
    l_token       VARCHAR2 (32) := l_body_json.get_string ('token');
    l_userid      VARCHAR2 (255);
    l_user        VARCHAR2 (255) := NULL;

    --payload
    l_id          VARCHAR2 (32) := NVL (l_body_json.get_string ('id'), NULL);
    l_sqd         VARCHAR2 (32) := NVL (l_body_json.get_string ('sqd'), NULL);
    l_lnm         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('lnm'), NULL);
    l_fnm         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('fnm'), NULL);
    l_rnk         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('rnk'), NULL);
    l_unm         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('unm'), NULL);
    l_cde         VARCHAR2 (2000)
                      := NVL (l_body_json.get_string ('cde'), NULL);
    l_sts         VARCHAR2 (32) := NVL (l_body_json.get_string ('sts'), NULL);
    l_rle         VARCHAR2 (4000)
                      := NVL (l_body_json.get_string ('rle'), NULL);
    l_pht         VARCHAR2 (255)
                      := NVL (l_body_json.get_string ('pht'), NULL);
BEGIN
    --created user
    BEGIN
        SELECT id
          INTO l_userid
          FROM T_USERS
         WHERE token = l_token;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_userid := NULL;
    END;



    -- main
    IF l_id IS NOT NULL
    THEN
        --update
        UPDATE T_USERS
           SET sqd = NVL (l_sqd, sqd),
               lnm = NVL (l_lnm, lnm),
               fnm = NVL (l_fnm, fnm),
               rnk = NVL (l_rnk, rnk),
               unm = NVL (l_unm, unm),
               sts = NVL (l_sts, sts),
               rle = NVL (l_rle, rle),
               pht = NVL (l_pht, pht),
               synced = '0'
         WHERE id = l_id;

        COMMIT;

        IF l_cde IS NOT NULL
        THEN
            UPDATE T_USERS
               SET password = NVL (l_cde, password), synced = '0'
             WHERE id = l_id;
            COMMIT;
        END IF;



        l_resp :=
            get_response_json (p_code           => 200,
                               p_message_code   => 'success',
                               p_result         => CONCAT ('update', l_id));
    ELSE
        --check user
        BEGIN
            SELECT id
              INTO l_user
              FROM T_USERS
             WHERE unm = l_unm AND ROWNUM = 1;
        EXCEPTION
            WHEN OTHERS
            THEN
                l_user := NULL;
        END;

        IF l_user IS NOT NULL
        THEN
            l_resp :=
                get_response_json (
                    p_code           => 400,
                    p_message_code   => 'unique_data'
                    );
        ELSE
            --insert
            INSERT INTO T_USERS (sqd,
                                    lnm,
                                    fnm,
                                    rnk,
                                    unm,
                                    sts,
                                    rle,
                                    pht,
                                    usr)
                 VALUES (l_sqd,
                         l_lnm,
                         l_fnm,
                         l_rnk,
                         l_unm,
                         l_sts,
                         l_rle,
                         l_pht,
                         l_userid)
              RETURNING id
                   INTO l_id;

            COMMIT;

             UPDATE T_USERS
               SET password = NVL (l_cde, password)
             WHERE id = l_id;

            COMMIT;

            l_resp :=
                get_response_json (p_code           => 200,
                                   p_message_code   => 'success',
                                   p_result         => l_id);
        END IF;
    END IF;


    --insert detail
    --insert file

    COMMIT;
    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_resp :=
            get_response_json (p_code             => 500,
                               p_message_code     => 'server_error',
                               p_custom_message   => SQLERRM);
        RETURN l_resp;
END F_USR_INSERT_OR_UPDATE;

/
--------------------------------------------------------
--  DDL for Function GET_RESPONSE_JSON
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."GET_RESPONSE_JSON" (
    p_code             NUMBER,
    p_message_code     VARCHAR2,
    p_result           CLOB DEFAULT '{}',
    p_custom_message   VARCHAR2 DEFAULT NULL)
    RETURN CLOB
AS
    l_result    CLOB;
    l_status    VARCHAR2 (10) := 'error';
    l_message   VARCHAR2 (255);
BEGIN
    BEGIN
        SELECT content
          INTO l_message
          FROM T_response_messages
         WHERE MESSAGE_CODE = p_message_code AND ROWNUM = 1;
    EXCEPTION
        WHEN NO_DATA_FOUND
        THEN
            l_message := 'Тохирох мессеж олдсонгүй.';
    END;

    IF p_custom_message IS NOT NULL
    THEN
        l_message := p_custom_message;
    END IF;

    IF p_code = 200 OR p_code = 201
    THEN
        l_status := 'success';
    END IF;

    SELECT JSON_OBJECT ('code' IS p_code,
                        'status' IS l_status,
                        'message' IS l_message,
                        'result' IS p_result FORMAT JSON
                        RETURNING CLOB)
      INTO l_result
      FROM DUAL;

    RETURN l_result;
END get_response_json;

/
--------------------------------------------------------
--  DDL for Function LOGIN_USR_PWD
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."LOGIN_USR_PWD" (
    p_body IN VARCHAR2
) RETURN CLOB AS

    l_resp        CLOB;
    l_username    VARCHAR2(500);
    l_password    VARCHAR2(2000);
    s_password    VARCHAR2(2000);
    s_user_id     VARCHAR2(2000);
    l_userpass_id VARCHAR2(255);
    l_token       VARCHAR2(255);
    g_token       VARCHAR2(255);
    l_filtername  VARCHAR2(255);
    l_role          VARCHAR2(255);
    l_sqd          VARCHAR2(255);
BEGIN
BEGIN
    l_username := json_object_t(p_body).get_string('username');
    l_password := json_object_t(p_body).get_string('password');
--    Баазаас дуудах
    BEGIN
        SELECT
            id,  CONCAT (
                       rnk,
                       CONCAT (
                           ' ',
                           CONCAT (CONCAT (SUBSTR (lnm, 0, 1), '.'),
                                   fnm))), rle, sqd
        INTO s_user_id, l_filtername, l_role, l_sqd
        FROM
            T_USERS
        WHERE
            unm = l_username;

    EXCEPTION
        WHEN OTHERS THEN
            l_password := NULL;
    END;

    IF s_user_id IS NULL THEN
        l_resp := get_response_json(p_code => 400, p_message_code => 'error_request', p_custom_message => 'Бүртгэлгүй хэрэглэгч байна.');
    ELSE
        BEGIN
            SELECT
                id,
                password
            INTO
                l_userpass_id,
                s_password
            FROM
                T_USERS
            WHERE
                id = s_user_id;

        EXCEPTION
            WHEN OTHERS THEN
                l_password := NULL;
        END;

        IF l_userpass_id IS NULL THEN
            l_resp := get_response_json(p_code => 400, p_message_code => 'error_request', p_custom_message => ':Нууц үг тодорхойлогдоогүй байна.');

        ELSE
            IF s_password = l_password THEN
                
                WHILE l_token is null LOOP
                    BEGIN
                      g_token:=sys_guid();
                      update T_USERS set token = g_token, expiredate = sysdate+100 where id = l_userpass_id;
                      l_token:=g_token;
                      EXCEPTION
                         WHEN OTHERS THEN
                         l_token := NULL;
                    END;
                END LOOP;
                
                SELECT
                    JSON_OBJECT(
                       'code' VALUE 200,
                        'status' VALUE 'success',                        
                        'message' VALUE 'Амжилттай',
                         'result' VALUE
                            JSON_OBJECT
                        ( 'token' VALUE l_token, 'expires' VALUE sysdate+100/24, 'expires_in' VALUE 100, 'filtername' VALUE l_filtername, 'role' value l_role, 'sqd' value l_sqd)
                    RETURNING CLOB)
                INTO l_resp
                FROM
                    dual;

            ELSE
                l_resp := get_response_json(p_code => 400, p_message_code => 'error_request', p_custom_message => ': Нууц үг буруу байна.');
            END IF;
        END IF;

    END IF;
      EXCEPTION
        WHEN OTHERS THEN
             l_resp := get_response_json(p_code => 400, p_message_code => 'error_request', p_custom_message => ': Алдаатай хүсэлт');
    END;
    RETURN l_resp;
END login_usr_pwd;

/
--------------------------------------------------------
--  DDL for Function MAKE_REQUEST
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE FUNCTION "ALPHA"."MAKE_REQUEST" (p_message_code   NUMBER,
                                               p_token          VARCHAR2,
                                               p_message_body   CLOB)
    RETURN CLOB
AS
    l_message_row   T_messages%ROWTYPE;
    l_resp          CLOB;
    l_result        CLOB;
    l_pair_no       VARCHAR2 (32);
    l_status_code   NUMBER (8);
    function_name   CLOB;
    l_msg           VARCHAR2 (255);
    l_userid        VARCHAR2 (32);
    l_status        BOOLEAN;
BEGIN
    l_pair_no := SYS_GUID ();
    l_status := FALSE;

    SELECT *
      INTO l_message_row
      FROM T_messages
     WHERE code = p_message_code;

    IF l_message_row.skip_log = 0
    THEN
        INSERT INTO T_logs (MESSAGE_CODE,
                            body,
                            TYPE,
                            pair_no)
             VALUES (p_message_code,
                     p_message_body,
                     'REQUEST',
                     l_pair_no);

        COMMIT;
    END IF;



    --is proteced
    IF l_message_row.is_protected = 'Y'
    THEN
        IF p_token IS NULL
        THEN
            l_resp :=
                get_response_json (p_code           => 402,
                                   p_message_code   => 'Authorization',
                                   p_result         => '{}');
            l_status := TRUE;
        ELSE
            BEGIN
                SELECT id
                  INTO l_userid
                  FROM T_USERS
                 WHERE TOKEN = SUBSTR (p_token, 8) AND EXPIREDATE > SYSDATE;
            EXCEPTION
                WHEN OTHERS
                THEN
                    l_userid := NULL;
            END;

            IF l_userid IS NULL
            THEN
                l_resp :=
                    get_response_json (p_code           => 402,
                                       p_message_code   => 'token_expired',
                                       p_result         => '{}');
                l_status := TRUE;
            END IF;
        END IF;
    END IF;



    IF l_status = FALSE
    THEN
        -- not protected
        IF l_message_row.is_end = 'Y'
        THEN
            CASE p_message_code
            WHEN 100001
                THEN
                    l_resp := F_CHOOSER (p_message_body);
                WHEN 100000
                THEN
                    l_resp := login_usr_pwd (p_message_body);
                WHEN 123000
                THEN
                    l_resp := F_GET_SHIREE (p_message_body);
                WHEN 123003
                THEN
                    l_resp := F_SHIREE_DELETE (p_message_body);
                WHEN 123001
                THEN
                    l_resp := F_SHIREE_INSERT_OR_UPDATE (p_message_body);
                WHEN 124000
                THEN
                    l_resp := F_GET_PRODUCTS (p_message_body);
                WHEN 124009
                THEN
                    l_resp := F_GET_PRODUCT_IMAGES (p_message_body);
                WHEN 124003
                THEN
                    l_resp := F_PRODUCT_DELETE (p_message_body);
                WHEN 124001
                THEN
                    l_resp := F_PRODUCT_INSERT_OR_UPDATE (p_message_body);
                WHEN 200000
                THEN
                    l_resp := F_USR_GET (p_message_body);
                WHEN 200001
                THEN
                    l_resp := F_USR_INSERT_OR_UPDATE (p_message_body);
                WHEN 100002
                THEN
                    l_resp := F_GLBL_CHANGEPASSWORD (p_message_body);
                WHEN 200003
                THEN
                    l_resp := F_USR_DELETE (p_message_body);
                WHEN 105000
                THEN
                    l_resp := F_CRM_W_GET (p_message_body);
                WHEN 105001
                THEN
                    l_resp := F_CRM_W_INSERT_OR_UPDATE (p_message_body);
                WHEN 105003
                THEN
                    l_resp := F_CRM_W_DELETE (p_message_body);
                
                    WHEN 125001
                THEN
                    l_resp := F_ORDER_INSERT (p_message_body);
                     WHEN 126001
                THEN
                    l_resp := F_ORLOGO_INSERT (p_message_body);
                    WHEN 127000
                THEN
                    l_resp := F_HUULGA (p_message_body);
                    WHEN 190001
                THEN
                    l_resp := F_BELL_INSERT (p_message_body);
                     WHEN 190000
                THEN
                    l_resp := F_BELL_GET (p_message_body);
                    WHEN 128000
                    
                THEN
                    l_resp := F_ULDEGDEL (p_message_body);
                ELSE
                    SELECT JSON_OBJECT ('code' VALUE 404,
                                        'status' VALUE 'error',
                                        'message' VALUE 'wrong message code',
                                        'result' VALUE '{}' FORMAT JSON)
                      INTO l_resp
                      FROM DUAL;
            END CASE;
        --is end bish bol
        ELSE
            BEGIN
                apex_web_service.g_request_headers (1).name := 'Content-Type';
                apex_web_service.g_request_headers (1).VALUE :=
                    'application/json';
                apex_web_service.g_request_headers (2).name := 'message_code';
                apex_web_service.g_request_headers (2).VALUE :=
                    p_message_code;

                l_resp :=
                    apex_web_service.make_rest_request (
                        p_url           => l_message_row.url,
                        p_http_method   => l_message_row.method,
                        p_body          => p_message_body);

                l_status_code := apex_web_service.g_status_code;

                IF l_status_code <> 200
                THEN
                    l_resp :=
                        '{"code": ' || l_status_code || ',"status":"error"}';
                ELSE
                    IF NOT (    json_object_t (l_resp).has ('code')
                            AND json_object_t (l_resp).has ('status')
                            AND json_object_t (l_resp).has ('result'))
                    THEN
                        SELECT JSON_OBJECT ('code' VALUE l_status_code,
                                            'status' VALUE 'success',
                                            'result' VALUE l_resp FORMAT JSON
                                            RETURNING CLOB)
                          INTO l_resp
                          FROM DUAL;
                    END IF;
                END IF;
            EXCEPTION
                WHEN OTHERS
                THEN
                    l_resp := '{"code": "9999 ' || SQLERRM || '"}';

                    INSERT INTO T_pendings (pair_id,
                                            url,
                                            body,
                                            method,
                                            MESSAGE_CODE)
                         VALUES (l_pair_no,
                                 l_message_row.url,
                                 p_message_body,
                                 l_message_row.method,
                                 p_message_code);

                    COMMIT;
            END;
        END IF;
    END IF;

    --end execution
    IF l_message_row.skip_log = 0
    THEN
        INSERT INTO T_logs (MESSAGE_CODE,
                            body,
                            TYPE,
                            pair_no,
                            status_code)
             VALUES (p_message_code,
                     l_resp,
                     'RESPONSE',
                     l_pair_no,
                     l_status_code);

        COMMIT;
    END IF;

    RETURN l_resp;
EXCEPTION
    WHEN OTHERS
    THEN
        l_msg := SQLERRM;

        SELECT JSON_OBJECT ('code' VALUE 400,
                            'status' VALUE 'error',
                            'message' VALUE l_msg,
                            'result' VALUE '{}' FORMAT JSON)
          INTO l_resp
          FROM DUAL;

        RETURN l_resp;
END make_request;

/
