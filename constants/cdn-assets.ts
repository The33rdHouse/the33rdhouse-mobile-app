// ============================================================
// THE 33RD HOUSE — CDN ASSETS (Mobile App)
// Sacred geometry and brand assets from Manus CDN
// ============================================================

const CDN_BASE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106";

export const CDN = {
  branding: {
    dragonIcon: `${CDN_BASE}/HaHUVWDshVqnMtIo.png`,
    mandalaLogo: `${CDN_BASE}/vcyptOOYEsjVtssE.png`,
  },
  decorative: {
    sacredGeometryHeroBg: `${CDN_BASE}/wJgToBLAcHrhkTPD.png`,
    sacredGeometryPattern: `${CDN_BASE}/hmntBANyIgJuHcrH.png`,
    eyeFlowerOfLife: `${CDN_BASE}/ziQWGHUcykawkClk.png`,
    sacredGeometryDivider: `${CDN_BASE}/yjCkXRypDpTkRbFk.png`,
    cornerOrnament: `${CDN_BASE}/cxXPdiWncyNVthgD.png`,
    sideBorderOrnament: `${CDN_BASE}/miWGcoMHxNVrRYcA.png`,
    bookCover: `${CDN_BASE}/cCRqorzzNLnhwKrv.png`,
  },
  gateSigils: [
    `${CDN_BASE}/LVzzpcPpwdHCDRzA.png`, // Gate 1 - The Seed
    `${CDN_BASE}/kKBXWPxVGWJeCAgt.png`, // Gate 2 - The Breath
    `${CDN_BASE}/NCELscGvMmbrAcpS.png`, // Gate 3 - The Form
    `${CDN_BASE}/MqVzRXBmlcJdQMvG.png`, // Gate 4 - The Power
    `${CDN_BASE}/sukjONHcvYeIkIPB.png`, // Gate 5 - The Connection
    `${CDN_BASE}/ruOaqQVpIyCuUfuh.png`, // Gate 6 - The Phoenix
    `${CDN_BASE}/PtyVfcUMQwpRjUBn.png`, // Gate 7 - The Union
    `${CDN_BASE}/scxFcVfbiGlDKiAH.png`, // Gate 8 - The Return
    `${CDN_BASE}/LcRDxCXQUCWOYPgp.png`, // Gate 9 - The Vision
    `${CDN_BASE}/KAbuYVSidbrXWuZQ.png`, // Gate 10 - The Law
    `${CDN_BASE}/AkPwLDqNyqOCSlcL.png`, // Gate 11 - The Mystery
    `${CDN_BASE}/kainydhcopXpszXM.png`, // Gate 12 - The Return
  ],
  gateCovers: [
    `${CDN_BASE}/lFUxsgAiPeXMhxPV.png`, // Gate 1
    `${CDN_BASE}/eAdWkNaIXMiFqwFM.png`, // Gate 2
    `${CDN_BASE}/SEXjnLLhzlUnTzCt.png`, // Gate 3
    `${CDN_BASE}/NLoMybCkELdclpFT.png`, // Gate 4
    `${CDN_BASE}/EAMczEhawpJSByRH.png`, // Gate 5
    `${CDN_BASE}/dTPLLTjvLRAKdoKs.png`, // Gate 6
    `${CDN_BASE}/AEIsRFpSUVkLJRqB.png`, // Gate 7
    `${CDN_BASE}/sCOetxeiaOMYLlvd.png`, // Gate 8
    `${CDN_BASE}/UCGlyVIptiXngzpN.png`, // Gate 9
    `${CDN_BASE}/AZeDHSnHUiUZJTdO.png`, // Gate 10
    `${CDN_BASE}/vFfdbTPCQAEvroAW.png`, // Gate 11
    `${CDN_BASE}/FvIJkyNIanenMXrE.png`, // Gate 12
  ],
  sacredGeometry: {
    theSpiral: `${CDN_BASE}/bFloEzFenIPdVfxu.webp`,
    dragonCurrent: `${CDN_BASE}/ChzdYfnLHTIaQyZs.webp`,
    flowerOfLife: `${CDN_BASE}/QGOdmaMeslZnUEsQ.webp`,
    flowerSphere: `${CDN_BASE}/tTPIOtHyrXbFlKjo.webp`,
    metatronsCube: `${CDN_BASE}/ccjncXEiFSSMJBNK.webp`,
    theCrown: `${CDN_BASE}/nybEJnUsntEhKero.webp`,
    theSun: `${CDN_BASE}/RhREWAqYMlojHnjX.webp`,
    theHeart: `${CDN_BASE}/VTconVygwZfwoQXm.webp`,
    vesicaPiscis: `${CDN_BASE}/QOpdjGmcCqfaxcBt.webp`,
    theArch: `${CDN_BASE}/ZBUWDbfzIPOhyYzs.webp`,
    cosmicEye: `${CDN_BASE}/AecnhGMlZJwOnunt.webp`,
    yinYang: `${CDN_BASE}/YQLZssVjcOuwSDMu.webp`,
    theWholeness: `${CDN_BASE}/TuJjBaaXYJIHBZKu.webp`,
    theInfinite: `${CDN_BASE}/KRaovprUHLRXlPHg.webp`,
  },
} as const;

/**
 * Get a sacred geometry image by index (cycles through the 14 available).
 * Used for page headers — each screen gets a distinct geometry.
 */
export function getSacredGeoByIndex(index: number): string {
  const geos = Object.values(CDN.sacredGeometry);
  return geos[index % geos.length];
}

/**
 * Get a gate cover image by gate number (1-12).
 */
export function getGateCover(gateNumber: number): string {
  const idx = Math.max(0, Math.min(11, gateNumber - 1));
  return CDN.gateCovers[idx];
}

/**
 * Get a gate sigil by gate number (1-12).
 */
export function getGateSigil(gateNumber: number): string {
  const idx = Math.max(0, Math.min(11, gateNumber - 1));
  return CDN.gateSigils[idx];
}
