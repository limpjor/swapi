module.exports = {
  OBTENER_UBIGEO:
      `SELECT PP.DSCPAIS, PD.IDEDISTRITO, PD.IDEPAIS, PD.IDEDEPARTAMENTO, PD.IDEPROVINCIA, PD.DSCDISTRITO, PD.UBIGEO
      FROM APP_IAA_TERCERO.PTO_DISTRITO PD
      inner join APP_IAA_TERCERO.PTO_PAIS PP on PP.IDEPAIS = PD.IDEPAIS
       WHERE PD.UBIGEO in (?);`,
  OBTENER_LISTA_PARAMETRO:
      `SELECT p.idePar, p.codigoC, p.codigoN, p.abreviatura, p.descripcion, p.descripcion2, p.refMigracion
      FROM APP_IAA_COMUNES.CFG_PARAMETRO p 
      WHERE ideTipPar = ? and indactivo = ?;`,
  OBTENER_OBT_PARAMETRO_N:
      `SELECT p.idePar, p.codigoC, p.codigoN, p.abreviatura, p.descripcion, p.descripcion2, p.refMigracion
      FROM APP_IAA_COMUNES.CFG_PARAMETRO p 
      WHERE ideTipPar = ? and codigoN = ? and indactivo = ?;`,
  OBTENER_OBT_PARAMETRO_C:
      `SELECT p.idePar, p.codigoC, p.codigoN, p.abreviatura, p.descripcion, p.descripcion2, p.refMigracion
      FROM APP_IAA_COMUNES.CFG_PARAMETRO p 
      WHERE ideTipPar = ? and codigoC = ? and indactivo = ?;`,
  OBTENER_OBT_PARAMETRO_REF_MIG:
    `SELECT p.idePar, p.codigoC, p.codigoN, p.abreviatura, p.descripcion, p.descripcion2, p.refMigracion
    FROM APP_IAA_COMUNES.CFG_PARAMETRO p 
    WHERE ideTipPar = ? and refMigracion = ? and indactivo = ?;`,
  OBTENER_PLAN_FINAN_TIPO_CLI:
    `SELECT  A.IDEPLANFINANCIAMIENTO AS IDEPLANFINANCIAMIENTO
    FROM APP_IAA_FINANZAS.PRV_PLANFINANCIAMIENTO A
    WHERE A.IDEPLANFINANCIAMIENTO = ?
      AND A.IDPTIPOCLI= ?;`,
  OBTENER_DATOS_CANAL_USUARIO: `
  SELECT RT.IDEROLTER IDECANAL,
  T.CODEXTERNO NUMID,
  T.IDETERCERO IDETERCERO
    FROM APP_IAA_TERCERO.TER_ROLTERCERO RT
    INNER JOIN APP_IAA_TERCERO.TER_TERCERO T
    ON RT.IDETERCERO = T.IDETERCERO
    WHERE RT.IDEROLTER = ?
    AND RT.STSROLTERCERO = 'ACT';
  `,
  OBTENER_DATOS_CORREDOR_CANAL: `
  SELECT RT.IDEROLTER IDECANAL,
  T.CODEXTERNO NUMID,
  T.IDETERCERO IDETERCERO
    FROM APP_IAA_ACUERDO.ACU_ACUERDO A
  INNER JOIN APP_IAA_TERCERO.TER_ROLTERCERO RT
      ON A.IDECORREDOR = RT.IDEROLTER
  INNER JOIN APP_IAA_TERCERO.TER_TERCERO T
      ON RT.IDETERCERO = T.IDETERCERO
  WHERE IDPTIPOACUSEG = 'POL'
    AND A.IDECANAL = :ideCanal
  `,

  CONDICIONES_VIGENCIA_POLIZA: `
    AND ((TRUNC(SYSDATE) BETWEEN POL.FECINIVIG AND POL.FECFINVIG) --  VIGENCIA EN RANGO DE FECHAS
    OR (TRUNC(SYSDATE) < POL.FECINIVIG) -- PÓLIZAS CON VIGENCIA FUTURA
    OR POL.FECFINVIG IS NULL -- PÓLIZAS CON VIGENCIA LIBRE
    )
  `,
  SELECT_TERCEROPEL_LIST: `
  with w_acu as (
    select /*+ materialize */
           pol.ideacuerdo, pol.idptipoacuseg,
           pol.ideprod, pol.idecanal
      from app_iaa_acuerdo.acu_acuerdo pol
     where pol.refexterna = :refexternapol
       and pol.idptipoacuseg = 'POL'
    union 
    select cer.ideacuerdo, cer.idptipoacuseg,
           cer.ideprod, cer.idecanal
      from app_iaa_acuerdo.acu_acuerdo cer
     where cer.refexterna = :refexternacer
       and cer.idptipoacuseg = 'CER'          
  ), w_prodcanalcfg as (
    select 1
      from w_acu wpol,
           app_iaa_producto.pro_prodcanal_autorizacion pca,
           xmltable('/tipos_oper/tipo_oper'
              passing xmltype(pca.tipooper)
              columns
                 codigo      varchar2(2) path'@codigo',
                 sts         varchar2(3) path'@sts'
           )top
     where wpol.idptipoacuseg = 'POL'
       and pca.ideprod = wpol.ideprod
       and pca.idecanal = wpol.idecanal
       and pca.tipoaut = 'PEL'
       and pca.sts = 'ACT'         
       and (pca.cantcert is null or pca.cantcert >= (select count(1) + 0
                                                       from app_iaa_acuerdo.acu_acuerdo cer
                                                      where cer.idemaestro = wpol.ideacuerdo
                                                        and cer.idptipoacuseg = 'CER'))
       and top.codigo = :tipooper
       and top.sts = 'ACT'
  )
  select rt.iderol iderol,
         ter.nomcompleto nombrecompleto, 
         aa.indaut consentimientopel,
         aac.correo correo
    from w_acu wacu,
         w_prodcanalcfg,
         app_iaa_acuerdo.acu_rolacuerdo ra,
         app_iaa_tercero.ter_roltercero rt,
         app_iaa_tercero.ter_tercero ter,
         app_iaa_acuerdo.acu_acuerdo_autorizacion aa,
         app_iaa_acuerdo.acu_acuerdo_aut_correo aac
   where ra.ideacuerdo in (wacu.ideacuerdo)
     and ra.stsrolacuerdo in ('ACT') 
     and rt.iderolter = ra.iderolter 
     and (wacu.idptipoacuseg, rt.iderol) in (('POL',8),('CER',9))
     and ter.idetercero = rt.idetercero
     and aa.ideacuerdo(+) = ra.ideacuerdo
     and aa.iderolter(+) = ra.iderolter
     and aa.tipoaut(+) = 'PEL' 
     and aac.ideacuerdo(+) = ra.ideacuerdo
     and aac.iderolter(+) = ra.iderolter
     and aac.tipoaut(+) = 'PEL'   
  `,

  OBTENER_NUMID: {
    get query() {
      return `SELECT * FROM ACSELX.DOCS_IDENTIDAD D 
    WHERE D.NUMID IN (${this.numid})
    AND D.TIPOIDDOC IN (${this.tipoDocumento})
    AND D.NUMIDDOC IN (${this.numeroDocumento}) `;
    },
  },
};
