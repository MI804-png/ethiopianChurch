// ── i18n ─────────────────────────────────────────────────────────────────────
const adminTranslations = {
  en: {
    languageLabel: 'Language',
    adminTopbar: 'Protected administrator workspace',
    adminReturnToSite: 'Return to public website',
    adminLoginTag: 'Administrator login',
    adminLoginTitle: 'Manage prayers, registrations, and visitors',
    adminLoginDesc: 'Only the administrator should know the login credentials for this dashboard.',
    adminUsernameLabel: 'Username',
    adminUsernamePlaceholder: 'Admin username',
    adminPasswordLabel: 'Password',
    adminPasswordPlaceholder: 'Admin password',
    adminSignIn: 'Sign in',
    adminDashboardTag: 'Dashboard',
    adminDashboardTitle: 'Budapest Medhane Alem Church Admin',
    adminLogout: 'Logout',
    adminSignedInAs: 'Signed in as',
    adminSessionExpired: 'Session expired. Please sign in again.',
    adminSigningIn: 'Signing in...',
    adminLoginFailed: 'Login failed.',
    // Stats
    adminStatPrayers: 'Prayers',
    adminStatDeletedPrayers: 'Deleted Prayers',
    adminStatEvents: 'Events',
    adminStatMembers: 'Members',
    adminStatPending: 'Pending',
    adminStatApproved: 'Approved',
    adminStatVisits: 'Visits',
    adminStatResources: 'Resources',
    adminStatActiveLinks: 'Active Links',
    adminStatInquiries: 'Inquiries',
    // Inquiry inbox
    adminInquiryTag: 'Website inquiries',
    adminInquiryTitle: 'Messages sent from the contact form',
    adminInquiryFrom: 'From',
    adminInquirySubject: 'Subject',
    adminInquiryReply: 'Reply via Gmail',
    adminInquiryDelete: 'Delete',
    adminInquiryDeleteConfirm: 'Delete this inquiry?',
    adminInquiryDeleteFailed: 'Delete failed.',
    adminInquiryStatus: 'Status',
    adminInquiryPending: 'Pending',
    adminInquiryApproved: 'Approved',
    adminInquiryRejected: 'Rejected',
    adminInquiryMarkPending: 'Mark pending',
    adminInquiryApprove: 'Approve',
    adminInquiryReject: 'Reject',
    adminInquiryUpdateFailed: 'Status update failed.',
    adminInquiryEmpty: 'No inquiries received yet.',
    // Prayer management
    adminPrayerTag: 'Prayer management',
    adminPrayerTitle: 'Add, edit, or delete prayers',
    adminPrayerTitleLabel: 'Prayer title',
    adminPrayerTitlePlaceholder: 'Prayer title',
    adminPrayerCategoryLabel: 'Category',
    adminPrayerCategoryPlaceholder: 'Weekly Prayer, Feast Day, Community',
    adminPrayerScheduledLabel: 'Scheduled time',
    adminPrayerScheduledPlaceholder: 'Every Sunday, 6:00 - 10:30',
    adminPrayerDescLabel: 'Description',
    adminPrayerDescPlaceholder: 'Prayer details',
    adminPrayerSave: 'Save prayer',
    adminPrayerReset: 'Reset',
    adminPrayerTrashTag: 'Prayer trash',
    adminPrayerTrashTitle: 'Restore mistakenly deleted prayers',
    adminPrayerEdit: 'Edit',
    adminPrayerDelete: 'Delete',
    adminPrayerRestore: 'Restore',
    adminPrayerShareGmail: 'Gmail',
    adminPrayerSaving: 'Saving prayer...',
    adminPrayerSaved: 'Prayer saved.',
    adminPrayerSaveFailed: 'Prayer save failed.',
    adminPrayerDeleteConfirm: 'Delete this prayer?',
    adminPrayerDeleteFailed: 'Delete failed.',
    adminPrayerRestored: 'Prayer restored.',
    adminPrayerRestoreFailed: 'Restore failed.',
    adminPrayerEmpty: 'No prayers are available.',
    adminPrayerTrashEmpty: 'Trash is empty.',
    adminPrayerEditing: 'Editing',
    // Event management
    adminEventTag: 'Event management',
    adminEventTitle: 'Create church events with time, date, files, and details',
    adminEventNewButton: 'Add new event',
    adminEventTitleLabel: 'Event title',
    adminEventTitlePlaceholder: 'Church event title',
    adminEventCategoryLabel: 'Category',
    adminEventCategoryPlaceholder: 'Liturgy, Conference, Youth, Memorial',
    adminEventDateLabel: 'Date',
    adminEventStartTimeLabel: 'Start time',
    adminEventEndTimeLabel: 'End time',
    adminEventLocationLabel: 'Location',
    adminEventLocationPlaceholder: 'Budapest Medhane Alem Church or other venue',
    adminEventExternalLinkLabel: 'External link',
    adminEventExternalLinkPlaceholder: 'https://event page or livestream link',
    adminEventDocumentLabel: 'Upload document',
    adminEventPublishCheckbox: 'Post this event to users',
    adminEventDetailsLabel: 'Details',
    adminEventDetailsPlaceholder: 'Event details, schedule, and instructions',
    adminEventSave: 'Save event',
    adminEventReset: 'Reset',
    adminEventEdit: 'Edit',
    adminEventHide: 'Hide from users',
    adminEventPost: 'Post to users',
    adminEventDelete: 'Delete',
    adminEventSaving: 'Saving event...',
    adminEventSaved: 'Event saved.',
    adminEventSaveFailed: 'Event save failed.',
    adminEventDeleteConfirm: 'Delete this event?',
    adminEventDeleteFailed: 'Delete failed.',
    adminEventPublishFailed: 'Publish update failed.',
    adminEventNoLocation: 'No location provided',
    adminEventEmpty: 'No events published yet.',
    adminEventCreatingNew: 'Creating a new event.',
    adminEventDocumentOptional: 'Optional: upload a document or add an external link.',
    adminEventDocumentRemove: 'Remove document',
    adminEventDocumentRemoved: 'Document will be removed when you save the event.',
    adminEventNoDocument: 'No document uploaded for this event.',
    adminEventDocumentOpen: 'Open document',
    adminEventPublished: 'Published',
    adminEventDraft: 'Draft',
    adminEventEditing: 'Editing',
    // Registrations
    adminRegTag: 'Community approvals',
    adminRegTitle: 'Review and accept registrations',
    adminRegDesc: 'New registrations require your approval before members can access the portal.',
    adminRegApprove: 'Approve',
    adminRegReject: 'Reject',
    adminRegUndo: 'Undo',
    adminRegDelete: 'Delete',
    adminRegDeleteConfirm: 'Delete this registration?',
    adminRegDeleteFailed: 'Delete failed.',
    adminRegStatusFailed: 'Status update failed.',
    adminRegEmpty: 'No registrations yet.',
    adminRegNoPhone: 'No phone provided',
    adminRegNoCity: 'No city provided',
    adminRegNoMessage: 'No message provided',
    // Member links
    adminMemberLinksTag: 'Community access links',
    adminMemberLinksTitle: 'Generate member-only share links',
    adminMemberSelect: 'Approved member',
    adminMemberExpiry: 'Expiry (days)',
    adminMemberGenerateLink: 'Generate link',
    adminMemberGenerating: 'Generating access link...',
    adminMemberGenFailed: 'Failed to generate link.',
    adminMemberLinkCreated: 'Link created for',
    adminMemberLinksEmpty: 'No community links yet.',
    adminMemberCopyLink: 'Copy link',
    adminMemberCopied: 'Copied',
    adminMemberCopyFailed: 'Copy failed',
    adminMemberOpen: 'Open',
    adminMemberExpires: 'Expires:',
    adminStatusActive: 'Active',
    adminStatusUsed: 'Used',
    adminStatusExpired: 'Expired',
    adminNoApprovedMembers: 'No approved members available',
    // Resources
    adminResourceTag: 'Community resources',
    adminResourceTitle: 'Add prayer documents or post videos',
    adminResourceTitleLabel: 'Resource title',
    adminResourceTitlePlaceholder: 'Prayer PDF or teaching video title',
    adminResourceTypeLabel: 'Type',
    adminResourceTypeDocument: 'Document',
    adminResourceTypeVideo: 'Video',
    adminResourceUrlLabel: 'URL (for video or external document)',
    adminResourceFileLabel: 'Upload document file (PDF, DOC, DOCX)',
    adminResourceInputHint: 'For document type, provide a URL or upload a file.',
    adminResourceDescLabel: 'Description',
    adminResourceDescPlaceholder: 'Optional description',
    adminResourcePublish: 'Publish resource',
    adminResourcePublishing: 'Publishing resource...',
    adminResourcePublished: 'Resource published.',
    adminResourcePublishFailed: 'Resource publish failed.',
    adminResourceDelete: 'Delete',
    adminResourceDeleteConfirm: 'Delete this resource?',
    adminResourceDeleteFailed: 'Delete failed.',
    adminResourceEmpty: 'No resources published yet.',
    // Gallery
    adminGalleryTag: 'Gallery management',
    adminGalleryTitle: 'Upload photos and videos for the home gallery',
    adminGalleryMediaLabel: 'Media file',
    adminGalleryItemTitleLabel: 'Title',
    adminGalleryCaptionLabel: 'Caption',
    adminGalleryUpload: 'Upload to gallery',
    adminGalleryUploading: 'Uploading media...',
    adminGalleryUploaded: 'Media uploaded to gallery.',
    adminGalleryUploadFailed: 'Gallery upload failed.',
    adminGalleryDelete: 'Delete',
    adminGalleryDeleteConfirm: 'Delete this gallery item?',
    adminGalleryDeleteFailed: 'Delete failed.',
    adminGalleryEmpty: 'No gallery media uploaded yet.',
    // Visitor log
    adminVisitorTag: 'Visitor log',
    adminVisitorTitle: 'Recent website entries',
    adminVisitorTime: 'Time',
    adminVisitorPage: 'Page',
    adminVisitorReferrer: 'Referrer',
    adminVisitorIP: 'IP',
    adminVisitorUA: 'User agent',
    adminVisitorEmpty: 'No visit records yet.',
    // System log
    adminLogTag: 'All logs',
    adminLogTitle: 'Unified system activity log',
    adminLogTime: 'Time',
    adminLogSource: 'Source',
    adminLogEvent: 'Event',
    adminLogActor: 'Actor',
    adminLogMethod: 'Method',
    adminLogPath: 'Path',
    adminLogStatus: 'Status',
    adminLogDetails: 'Details',
    adminLogEmpty: 'No system log records yet.',
    // Homepage editor
    adminHomeEditorTag: 'Homepage content editor',
    adminHomeEditorTitle: 'Edit any text on the home page',
    adminHomeEditorDesc: 'Load the current home page sources, edit text, then save. Changes apply immediately.',
    adminHomeEditorLoad: 'Load latest',
    adminHomeEditorAdvanced: 'Advanced source editor',
    adminHomeEditorIndexLabel: 'Home HTML source (index.html)',
    adminHomeEditorScriptLabel: 'Home script source (script.js)',
    adminHomeEditorSave: 'Save homepage text',
    adminHomeReplaceFindLabel: 'Text currently shown on the website',
    adminHomeReplaceWithLabel: 'New text',
    adminHomeReplaceSave: 'Replace text and save',
    adminHomeReplaceNotFound: 'That text was not found in the saved homepage content.',
    adminHomeReplaceSaved: 'Homepage text replaced and saved.',
    adminHomeEditorLoading: 'Loading homepage sources...',
    adminHomeEditorLoaded: 'Homepage sources loaded.',
    adminHomeEditorSaving: 'Saving homepage text...',
    adminHomeEditorSaved: 'Homepage text saved.',
    adminHomeEditorFailed: 'Failed to update homepage text.',
    // Backup restore
    adminBackupTag: 'Backup and restore',
    adminBackupTitle: 'Restore website data without coding',
    adminBackupDesc: 'Choose a snapshot and restore database, homepage text, and uploads. The server restarts automatically.',
    adminBackupCreateNow: 'Create snapshot now',
    adminBackupRefresh: 'Refresh snapshots',
    adminBackupLoading: 'Loading backups...',
    adminBackupCreating: 'Creating snapshot...',
    adminBackupCreated: 'Snapshot created successfully.',
    adminBackupEmpty: 'No snapshots found yet.',
    adminBackupRestore: 'Restore snapshot',
    adminBackupRestoreConfirm: 'Restore this snapshot now? The server will restart and current data will be replaced.',
    adminBackupRestoreStarted: 'Restore started. The server will restart shortly.',
    adminBackupRestoreFailed: 'Restore failed.',
    adminBackupManual: 'Manual',
    adminBackupScheduled: 'Scheduled',
    adminBackupStartup: 'Startup',
    adminBackupUnknownReason: 'Unknown',
    adminBackupReason: 'Reason',
    adminBackupCreatedAt: 'Created',
    adminBackupPathLabel: 'Backup path',
    adminBackupPathUnavailable: 'Unavailable',
    // Deleted prayer
    adminPrayerDeletedTag: 'Deleted',
  },
  hu: {
    languageLabel: 'Nyelv',
    adminTopbar: 'Védett rendszergazdai munkaterület',
    adminReturnToSite: 'Vissza a nyilvános weboldalra',
    adminLoginTag: 'Rendszergazdai bejelentkezés',
    adminLoginTitle: 'Imák, regisztrációk és látogatók kezelése',
    adminLoginDesc: 'Csak a rendszergazda ismerheti az irányítópult bejelentkezési adatait.',
    adminUsernameLabel: 'Felhasználónév',
    adminUsernamePlaceholder: 'Admin felhasználónév',
    adminPasswordLabel: 'Jelszó',
    adminPasswordPlaceholder: 'Admin jelszó',
    adminSignIn: 'Bejelentkezés',
    adminDashboardTag: 'Irányítópult',
    adminDashboardTitle: 'Budapest Medhane Alem Egyház Admin',
    adminLogout: 'Kijelentkezés',
    adminSignedInAs: 'Bejelentkezve mint',
    adminSessionExpired: 'A munkamenet lejárt. Kérjük, jelentkezzen be újra.',
    adminSigningIn: 'Bejelentkezés...',
    adminLoginFailed: 'Bejelentkezés sikertelen.',
    // Stats
    adminStatPrayers: 'Imák',
    adminStatDeletedPrayers: 'Törölt imák',
    adminStatEvents: 'Események',
    adminStatMembers: 'Tagok',
    adminStatPending: 'Függőben',
    adminStatApproved: 'Jóváhagyva',
    adminStatVisits: 'Látogatások',
    adminStatResources: 'Erőforrások',
    adminStatActiveLinks: 'Aktív hivatkozások',
    adminStatInquiries: 'Megkeresések',
    // Inquiry inbox
    adminInquiryTag: 'Weboldal megkeresések',
    adminInquiryTitle: 'A kapcsolatfelvételi űrlapról érkezett üzenetek',
    adminInquiryFrom: 'Feladó',
    adminInquirySubject: 'Tárgy',
    adminInquiryReply: 'Válasz Gmailben',
    adminInquiryDelete: 'Törlés',
    adminInquiryDeleteConfirm: 'Törli ezt a megkeresést?',
    adminInquiryDeleteFailed: 'Törlés sikertelen.',
    adminInquiryStatus: 'Állapot',
    adminInquiryPending: 'Függőben',
    adminInquiryApproved: 'Jóváhagyva',
    adminInquiryRejected: 'Elutasítva',
    adminInquiryMarkPending: 'Függőbe állítás',
    adminInquiryApprove: 'Jóváhagyás',
    adminInquiryReject: 'Elutasítás',
    adminInquiryUpdateFailed: 'Állapotfrissítés sikertelen.',
    adminInquiryEmpty: 'Még nem érkezett megkeresés.',
    // Prayer management
    adminPrayerTag: 'Imák kezelése',
    adminPrayerTitle: 'Imák hozzáadása, szerkesztése vagy törlése',
    adminPrayerTitleLabel: 'Ima neve',
    adminPrayerTitlePlaceholder: 'Ima neve',
    adminPrayerCategoryLabel: 'Kategória',
    adminPrayerCategoryPlaceholder: 'Heti ima, Ünnepi ima, Közösségi',
    adminPrayerScheduledLabel: 'Ütemezett időpont',
    adminPrayerScheduledPlaceholder: 'Minden vasárnap, 6:00 - 10:30',
    adminPrayerDescLabel: 'Leírás',
    adminPrayerDescPlaceholder: 'Az ima részletei',
    adminPrayerSave: 'Ima mentése',
    adminPrayerReset: 'Visszaállítás',
    adminPrayerTrashTag: 'Törölt imák',
    adminPrayerTrashTitle: 'Tévedésből törölt imák visszaállítása',
    adminPrayerEdit: 'Szerkesztés',
    adminPrayerDelete: 'Törlés',
    adminPrayerRestore: 'Visszaállítás',
    adminPrayerShareGmail: 'Gmail',
    adminPrayerSaving: 'Ima mentése...',
    adminPrayerSaved: 'Ima mentve.',
    adminPrayerSaveFailed: 'Az ima mentése sikertelen.',
    adminPrayerDeleteConfirm: 'Törli ezt az imát?',
    adminPrayerDeleteFailed: 'Törlés sikertelen.',
    adminPrayerRestored: 'Ima visszaállítva.',
    adminPrayerRestoreFailed: 'Visszaállítás sikertelen.',
    adminPrayerEmpty: 'Nincsenek elérhető imák.',
    adminPrayerTrashEmpty: 'A kuka üres.',
    adminPrayerEditing: 'Szerkesztés',
    // Event management
    adminEventTag: 'Események kezelése',
    adminEventTitle: 'Egyházi események létrehozása időponttal, dátummal, fájlokkal és részletekkel',
    adminEventNewButton: 'Új esemény hozzáadása',
    adminEventTitleLabel: 'Esemény neve',
    adminEventTitlePlaceholder: 'Egyházi esemény neve',
    adminEventCategoryLabel: 'Kategória',
    adminEventCategoryPlaceholder: 'Liturgia, Konferencia, Ifjúság, Megemlékezés',
    adminEventDateLabel: 'Dátum',
    adminEventStartTimeLabel: 'Kezdési idő',
    adminEventEndTimeLabel: 'Befejezési idő',
    adminEventLocationLabel: 'Helyszín',
    adminEventLocationPlaceholder: 'Budapest Medhane Alem Egyház vagy más helyszín',
    adminEventExternalLinkLabel: 'Külső hivatkozás',
    adminEventExternalLinkPlaceholder: 'https://esemény oldala vagy élő közvetítés',
    adminEventDocumentLabel: 'Dokumentum feltöltése',
    adminEventPublishCheckbox: 'Esemény közzététele a felhasználóknak',
    adminEventDetailsLabel: 'Részletek',
    adminEventDetailsPlaceholder: 'Esemény részletei, program és utasítások',
    adminEventSave: 'Esemény mentése',
    adminEventReset: 'Visszaállítás',
    adminEventEdit: 'Szerkesztés',
    adminEventHide: 'Elrejtés a felhasználók elől',
    adminEventPost: 'Közzététel a felhasználóknak',
    adminEventDelete: 'Törlés',
    adminEventSaving: 'Esemény mentése...',
    adminEventSaved: 'Esemény mentve.',
    adminEventSaveFailed: 'Az esemény mentése sikertelen.',
    adminEventDeleteConfirm: 'Törli ezt az eseményt?',
    adminEventDeleteFailed: 'Törlés sikertelen.',
    adminEventPublishFailed: 'A közzététel frissítése sikertelen.',
    adminEventNoLocation: 'Nincs megadott helyszín',
    adminEventEmpty: 'Még nem tettek közzé eseményt.',
    adminEventCreatingNew: 'Új esemény létrehozása.',
    adminEventDocumentOptional: 'Opcionális: töltsön fel dokumentumot vagy adjon meg külső hivatkozást.',
    adminEventDocumentRemove: 'Dokumentum eltávolítása',
    adminEventDocumentRemoved: 'A dokumentum törlődik az esemény mentésekor.',
    adminEventNoDocument: 'Ehhez az eseményhez nincs feltöltött dokumentum.',
    adminEventDocumentOpen: 'Dokumentum megnyitása',
    adminEventPublished: 'Közzétéve',
    adminEventDraft: 'Piszkozat',
    adminEventEditing: 'Szerkesztés',
    // Registrations
    adminRegTag: 'Közösségi jóváhagyások',
    adminRegTitle: 'Regisztrációk áttekintése és elfogadása',
    adminRegDesc: 'Az új regisztrációkat jóvá kell hagyni, mielőtt a tagok hozzáférhetnének a portálhoz.',
    adminRegApprove: 'Jóváhagyás',
    adminRegReject: 'Elutasítás',
    adminRegUndo: 'Visszavonás',
    adminRegDelete: 'Törlés',
    adminRegDeleteConfirm: 'Törli ezt a regisztrációt?',
    adminRegDeleteFailed: 'Törlés sikertelen.',
    adminRegStatusFailed: 'Állapot frissítése sikertelen.',
    adminRegEmpty: 'Még nincs regisztráció.',
    adminRegNoPhone: 'Nincs megadott telefonszám',
    adminRegNoCity: 'Nincs megadott város',
    adminRegNoMessage: 'Nincs megadott üzenet',
    // Member links
    adminMemberLinksTag: 'Közösségi hozzáférési hivatkozások',
    adminMemberLinksTitle: 'Csak tagoknak szóló megosztási hivatkozások létrehozása',
    adminMemberSelect: 'Jóváhagyott tag',
    adminMemberExpiry: 'Lejárat (napokban)',
    adminMemberGenerateLink: 'Hivatkozás létrehozása',
    adminMemberGenerating: 'Hozzáférési hivatkozás létrehozása...',
    adminMemberGenFailed: 'A hivatkozás létrehozása sikertelen.',
    adminMemberLinkCreated: 'Hivatkozás létrehozva ehhez',
    adminMemberLinksEmpty: 'Még nincs közösségi hivatkozás.',
    adminMemberCopyLink: 'Hivatkozás másolása',
    adminMemberCopied: 'Másolva',
    adminMemberCopyFailed: 'Másolás sikertelen',
    adminMemberOpen: 'Megnyitás',
    adminMemberExpires: 'Lejárat:',
    adminStatusActive: 'Aktív',
    adminStatusUsed: 'Felhasznált',
    adminStatusExpired: 'Lejárt',
    adminNoApprovedMembers: 'Nincs jóváhagyott tag',
    // Resources
    adminResourceTag: 'Közösségi erőforrások',
    adminResourceTitle: 'Ima dokumentumok hozzáadása vagy videók közzététele',
    adminResourceTitleLabel: 'Erőforrás neve',
    adminResourceTitlePlaceholder: 'Ima PDF vagy tanítási videó neve',
    adminResourceTypeLabel: 'Típus',
    adminResourceTypeDocument: 'Dokumentum',
    adminResourceTypeVideo: 'Videó',
    adminResourceUrlLabel: 'URL (videóhoz vagy külső dokumentumhoz)',
    adminResourceFileLabel: 'Dokumentum fájl feltöltése (PDF, DOC, DOCX)',
    adminResourceInputHint: 'Dokumentum típusnál adjon meg URL-t vagy töltsön fel fájlt.',
    adminResourceDescLabel: 'Leírás',
    adminResourceDescPlaceholder: 'Opcionális leírás',
    adminResourcePublish: 'Erőforrás közzététele',
    adminResourcePublishing: 'Erőforrás közzététele...',
    adminResourcePublished: 'Erőforrás közzétéve.',
    adminResourcePublishFailed: 'Az erőforrás közzététele sikertelen.',
    adminResourceDelete: 'Törlés',
    adminResourceDeleteConfirm: 'Törli ezt az erőforrást?',
    adminResourceDeleteFailed: 'Törlés sikertelen.',
    adminResourceEmpty: 'Még nem tettek közzé erőforrást.',
    // Gallery
    adminGalleryTag: 'Galéria kezelés',
    adminGalleryTitle: 'Fotók és videók feltöltése a főoldali galériához',
    adminGalleryMediaLabel: 'Médiafájl',
    adminGalleryItemTitleLabel: 'Cím',
    adminGalleryCaptionLabel: 'Felirat',
    adminGalleryUpload: 'Feltöltés a galériába',
    adminGalleryUploading: 'Média feltöltése...',
    adminGalleryUploaded: 'Média feltöltve a galériába.',
    adminGalleryUploadFailed: 'Galéria feltöltés sikertelen.',
    adminGalleryDelete: 'Törlés',
    adminGalleryDeleteConfirm: 'Törli ezt a galéria elemet?',
    adminGalleryDeleteFailed: 'Törlés sikertelen.',
    adminGalleryEmpty: 'Még nincs feltöltött galéria tartalom.',
    // Visitor log
    adminVisitorTag: 'Látogatói napló',
    adminVisitorTitle: 'Legutóbbi weboldal látogatások',
    adminVisitorTime: 'Idő',
    adminVisitorPage: 'Oldal',
    adminVisitorReferrer: 'Hivatkozó',
    adminVisitorIP: 'IP-cím',
    adminVisitorUA: 'Böngésző',
    adminVisitorEmpty: 'Még nincs látogatási adat.',
    // System log
    adminLogTag: 'Összes napló',
    adminLogTitle: 'Egységes rendszeraktivitás napló',
    adminLogTime: 'Idő',
    adminLogSource: 'Forrás',
    adminLogEvent: 'Esemény',
    adminLogActor: 'Szereplő',
    adminLogMethod: 'Módszer',
    adminLogPath: 'Útvonal',
    adminLogStatus: 'Állapot',
    adminLogDetails: 'Részletek',
    adminLogEmpty: 'Még nincs rendszernapló bejegyzés.',
    // Homepage editor
    adminHomeEditorTag: 'Főoldal tartalomszerkesztő',
    adminHomeEditorTitle: 'A főoldal bármely szövegének szerkesztése',
    adminHomeEditorDesc: 'Töltse be az aktuális főoldal forrásait, szerkessze a szöveget, majd mentse. A módosítások azonnal életbe lépnek.',
    adminHomeEditorLoad: 'Legfrissebb betöltése',
    adminHomeEditorAdvanced: 'Haladó forrásszerkesztő',
    adminHomeEditorIndexLabel: 'Főoldal HTML forrás (index.html)',
    adminHomeEditorScriptLabel: 'Főoldal script forrás (script.js)',
    adminHomeEditorSave: 'Főoldal szöveg mentése',
    adminHomeReplaceFindLabel: 'A weboldalon jelenleg látható szöveg',
    adminHomeReplaceWithLabel: 'Új szöveg',
    adminHomeReplaceSave: 'Szöveg cseréje és mentése',
    adminHomeReplaceNotFound: 'Ez a szöveg nem található a mentett főoldal tartalmában.',
    adminHomeReplaceSaved: 'A főoldal szövege lecserélve és elmentve.',
    adminHomeEditorLoading: 'Főoldal forrásainak betöltése...',
    adminHomeEditorLoaded: 'Főoldal forrásai betöltve.',
    adminHomeEditorSaving: 'Főoldal szöveg mentése...',
    adminHomeEditorSaved: 'Főoldal szöveg mentve.',
    adminHomeEditorFailed: 'A főoldal frissítése sikertelen.',
    // Backup restore
    adminBackupTag: 'Biztonsági mentés és visszaállítás',
    adminBackupTitle: 'Weboldal adatok visszaállítása programozás nélkül',
    adminBackupDesc: 'Válasszon pillanatképet, majd állítsa vissza az adatbázist, a főoldal szövegét és a feltöltéseket. A szerver automatikusan újraindul.',
    adminBackupCreateNow: 'Pillanatkép készítése most',
    adminBackupRefresh: 'Pillanatképek frissítése',
    adminBackupLoading: 'Mentések betöltése...',
    adminBackupCreating: 'Pillanatkép készítése...',
    adminBackupCreated: 'A pillanatkép sikeresen elkészült.',
    adminBackupEmpty: 'Még nincs elérhető pillanatkép.',
    adminBackupRestore: 'Pillanatkép visszaállítása',
    adminBackupRestoreConfirm: 'Visszaállítja most ezt a pillanatképet? A szerver újraindul, és a jelenlegi adatok felülíródnak.',
    adminBackupRestoreStarted: 'A visszaállítás elindult. A szerver hamarosan újraindul.',
    adminBackupRestoreFailed: 'A visszaállítás sikertelen.',
    adminBackupManual: 'Kézi',
    adminBackupScheduled: 'Ütemezett',
    adminBackupStartup: 'Indításkori',
    adminBackupUnknownReason: 'Ismeretlen',
    adminBackupReason: 'Típus',
    adminBackupCreatedAt: 'Létrehozva',
    adminBackupPathLabel: 'Mentési útvonal',
    adminBackupPathUnavailable: 'Nem elérhető',
    // Deleted prayer
    adminPrayerDeletedTag: 'Törölve',
  },
};

let adminCurrentLanguage = localStorage.getItem('site-language') || 'en';
if (!adminTranslations[adminCurrentLanguage]) {
  adminCurrentLanguage = 'en';
}

function t(key) {
  return adminTranslations[adminCurrentLanguage]?.[key] || adminTranslations.en[key] || key;
}

function applyAdminTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (key) node.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (key) node.setAttribute('placeholder', t(key));
  });
  document.documentElement.lang = adminCurrentLanguage;
}

const adminLanguageSelect = document.querySelector('#admin-language-select');
if (adminLanguageSelect) {
  adminLanguageSelect.value = adminCurrentLanguage;
  adminLanguageSelect.addEventListener('change', () => {
    adminCurrentLanguage = adminLanguageSelect.value;
    localStorage.setItem('site-language', adminCurrentLanguage);
    applyAdminTranslations();
    // Re-render dynamic lists so they pick up new language
    hydrateDashboard();
  });
}

applyAdminTranslations();

// ─────────────────────────────────────────────────────────────────────────────
const authCard = document.querySelector('#admin-auth-card');
const dashboard = document.querySelector('#admin-dashboard');
const loginForm = document.querySelector('#admin-login-form');
const loginFeedback = document.querySelector('#admin-login-feedback');
const adminIdentity = document.querySelector('#admin-identity');
const logoutButton = document.querySelector('#logout-button');
const prayerForm = document.querySelector('#prayer-form');
const prayerReset = document.querySelector('#prayer-reset');
const prayerFeedback = document.querySelector('#prayer-feedback');
const prayerAdminList = document.querySelector('#prayer-admin-list');
const eventForm = document.querySelector('#event-form');
const eventReset = document.querySelector('#event-reset');
const eventNewButton = document.querySelector('#event-new-button');
const eventFeedback = document.querySelector('#event-feedback');
const eventAdminList = document.querySelector('#event-admin-list');
const eventDocumentStatus = document.querySelector('#event-document-status');
const registrationList = document.querySelector('#registration-list');
const visitorList = document.querySelector('#visitor-list');
const accessRequestsList = document.querySelector('#access-requests-list');

const systemLogList = document.querySelector('#system-log-list');
const adminStats = document.querySelector('#admin-stats');
const memberLinkForm = document.querySelector('#member-link-form');
const memberLinkFeedback = document.querySelector('#member-link-feedback');
const memberSelect = document.querySelector('#member-select');
const memberLinksList = document.querySelector('#member-links-list');
const resourceForm = document.querySelector('#resource-form');
const resourceFeedback = document.querySelector('#resource-feedback');
const resourceList = document.querySelector('#resource-list');
const inquiryList = document.querySelector('#inquiry-list');
const galleryForm = document.querySelector('#gallery-form');
const galleryFeedback = document.querySelector('#gallery-feedback');
const galleryList = document.querySelector('#gallery-list');
const prayerTrashList = document.querySelector('#prayer-trash-list');
const homepageEditorForm = document.querySelector('#homepage-editor-form');
const homepageEditorFeedback = document.querySelector('#homepage-editor-feedback');
const homepageEditorLoadButton = document.querySelector('#homepage-editor-load');
const homepageIndexSource = document.querySelector('#homepage-index-source');
const homepageScriptSource = document.querySelector('#homepage-script-source');
const homepageTextReplaceForm = document.querySelector('#homepage-text-replace-form');
const homepageTextReplaceFeedback = document.querySelector('#homepage-text-replace-feedback');
const homepageReplaceFind = document.querySelector('#homepage-replace-find');
const homepageReplaceWith = document.querySelector('#homepage-replace-with');
const backupCreateButton = document.querySelector('#backup-create-button');
const backupRefreshButton = document.querySelector('#backup-refresh-button');
const backupFeedback = document.querySelector('#backup-feedback');
const backupList = document.querySelector('#backup-list');
const backupPath = document.querySelector('#backup-path');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeWhitespace(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function countBigrams(value) {
  const normalized = normalizeWhitespace(value);
  const bigrams = new Map();

  if (normalized.length < 2) {
    return bigrams;
  }

  for (let index = 0; index < normalized.length - 1; index += 1) {
    const pair = normalized.slice(index, index + 2);
    bigrams.set(pair, (bigrams.get(pair) || 0) + 1);
  }

  return bigrams;
}

function stringSimilarity(left, right) {
  const leftMap = countBigrams(left);
  const rightMap = countBigrams(right);

  if (leftMap.size === 0 || rightMap.size === 0) {
    return normalizeWhitespace(left) === normalizeWhitespace(right) ? 1 : 0;
  }

  let intersection = 0;
  let leftSize = 0;
  let rightSize = 0;

  leftMap.forEach((count, pair) => {
    leftSize += count;
    intersection += Math.min(count, rightMap.get(pair) || 0);
  });

  rightMap.forEach((count) => {
    rightSize += count;
  });

  return (2 * intersection) / (leftSize + rightSize);
}

function replaceTextInSource(source, findText, replaceText) {
  const exactCount = source.includes(findText) ? source.split(findText).length - 1 : 0;
  if (exactCount > 0) {
    return {
      updatedSource: source.split(findText).join(replaceText),
      replacements: exactCount,
    };
  }

  const trimmedFindText = findText.trim();
  const trimmedExactCount = trimmedFindText && source.includes(trimmedFindText)
    ? source.split(trimmedFindText).length - 1
    : 0;
  if (trimmedExactCount > 0) {
    return {
      updatedSource: source.split(trimmedFindText).join(replaceText),
      replacements: trimmedExactCount,
    };
  }

  const normalizedParts = trimmedFindText.split(/\s+/).filter(Boolean);
  if (normalizedParts.length > 0) {
    const flexibleRegex = new RegExp(normalizedParts.map(escapeRegExp).join('\\s+'), 'gu');
    const regexMatches = source.match(flexibleRegex);
    if (regexMatches && regexMatches.length > 0) {
      return {
        updatedSource: source.replace(flexibleRegex, replaceText),
        replacements: regexMatches.length,
      };
    }
  }

  const normalizedFindText = normalizeWhitespace(findText);
  let bestMatch = null;

  for (const match of source.matchAll(/>([^<>]+)</gu)) {
    const originalText = match[1];
    const normalizedCandidate = normalizeWhitespace(originalText);

    if (!normalizedCandidate) {
      continue;
    }

    let score = stringSimilarity(normalizedCandidate, normalizedFindText);
    if (normalizedCandidate.includes(normalizedFindText) || normalizedFindText.includes(normalizedCandidate)) {
      score = Math.max(score, 0.92);
    }

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { originalText, score };
    }
  }

  if (bestMatch && bestMatch.score >= 0.72) {
    return {
      updatedSource: source.replace(bestMatch.originalText, replaceText),
      replacements: 1,
    };
  }

  return {
    updatedSource: source,
    replacements: 0,
  };
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const hasJson = response.headers.get('content-type')?.includes('application/json');
  const payload = hasJson ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      forceRelogin(payload?.error || null);
    }
    throw new Error(payload?.error || payload?.message || 'Request failed.');
  }

  return payload;
}

function setAuthenticated(session) {
  authCard.hidden = true;
  dashboard.hidden = false;
  adminIdentity.textContent = `${t('adminSignedInAs')} ${session.admin.username}`;
}

function setLoggedOut() {
  dashboard.hidden = true;
  authCard.hidden = false;
}

function forceRelogin(message = null) {
  message = message ?? t('adminSessionExpired');
  setLoggedOut();
  if (loginFeedback) {
    loginFeedback.textContent = message;
  }
}

function fillPrayerForm(prayer) {
  prayerForm.elements.id.value = prayer.id;
  prayerForm.elements.title.value = prayer.title;
  prayerForm.elements.category.value = prayer.category;
  prayerForm.elements.scheduledFor.value = prayer.scheduledFor;
  prayerForm.elements.content.value = prayer.content;
}

function resetPrayerForm() {
  prayerForm.reset();
  prayerForm.elements.id.value = '';
  prayerFeedback.textContent = '';
}

function attachRemoveDocumentAction() {
  const removeButton = document.querySelector('#remove-event-document');
  if (!removeButton || !eventForm || !eventDocumentStatus) {
    return;
  }

  removeButton.addEventListener('click', () => {
    eventForm.elements.removeDocument.value = 'true';
    eventDocumentStatus.textContent = t('adminEventDocumentRemoved');
  });
}

function fillEventForm(eventItem) {
  eventForm.elements.id.value = eventItem.id;
  eventForm.elements.title.value = eventItem.title;
  eventForm.elements.category.value = eventItem.category;
  eventForm.elements.eventDate.value = eventItem.eventDate;
  eventForm.elements.eventStartTime.value = eventItem.eventStartTime;
  eventForm.elements.eventEndTime.value = eventItem.eventEndTime || '';
  eventForm.elements.location.value = eventItem.location || '';
  eventForm.elements.details.value = eventItem.details;
  eventForm.elements.externalLink.value = eventItem.externalLink || '';
  eventForm.elements.isPublished.checked = Boolean(eventItem.isPublished);
  eventForm.elements.removeDocument.value = 'false';

  if (eventDocumentStatus) {
    eventDocumentStatus.innerHTML = eventItem.documentUrl
      ? `${t('adminEventDocumentOpen')}: <a href="${escapeHtml(eventItem.documentUrl)}" target="_blank" rel="noreferrer">${escapeHtml(eventItem.documentName || t('adminEventDocumentOpen'))}</a> <button class="button button--secondary admin-inline-button" id="remove-event-document" type="button">${t('adminEventDocumentRemove')}</button>`
      : t('adminEventNoDocument');
  }

  const documentInput = eventForm.querySelector('input[name="document"]');
  if (documentInput) {
    documentInput.value = '';
  }

  attachRemoveDocumentAction();
}

function resetEventForm() {
  eventForm.reset();
  eventForm.elements.id.value = '';
  eventForm.elements.isPublished.checked = true;
  eventForm.elements.removeDocument.value = 'false';
  eventFeedback.textContent = '';
  if (eventDocumentStatus) {
    eventDocumentStatus.textContent = t('adminEventDocumentOptional');
  }
}

function renderPrayerActions(prayer) {
  const shareText = encodeURIComponent(`${prayer.title} - ${prayer.scheduledFor}\n\n${prayer.content}`);
  const shareUrl = encodeURIComponent(`${window.location.origin}/#prayers`);
  const emailSubject = encodeURIComponent(`${prayer.title} - Budapest Medhane Alem Church`);
  const emailBody = encodeURIComponent(`${prayer.title} - ${prayer.scheduledFor}\n\n${prayer.content}\n\n${window.location.origin}/#prayers`);
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=budapesteotc@gmail.com&su=${emailSubject}&body=${emailBody}`;

  return `
    <div class="admin-item__actions">
      <button
        class="button button--secondary admin-edit-prayer"
        type="button"
        data-id="${prayer.id}"
        data-title="${escapeHtml(prayer.title)}"
        data-category="${escapeHtml(prayer.category)}"
        data-scheduledfor="${escapeHtml(prayer.scheduledFor)}"
        data-content="${escapeHtml(prayer.content)}"
      >` + t('adminPrayerEdit') + `</button>
      <button class="button button--secondary admin-delete-prayer" type="button" data-id="${prayer.id}">${t('adminPrayerDelete')}</button>
      <a class="share-link" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noreferrer">Facebook</a>
      <a class="share-link" href="https://wa.me/?text=${shareText}%20${shareUrl}" target="_blank" rel="noreferrer">WhatsApp</a>
      <a class="share-link" href="https://t.me/share/url?url=${shareUrl}&text=${shareText}" target="_blank" rel="noreferrer">Telegram</a>
      <a class="share-link" href="${gmailComposeUrl}" target="_blank" rel="noreferrer">${t('adminPrayerShareGmail')}</a>
    </div>
  `;
}

async function loadOverview() {
  const stats = await api('/api/admin/overview');
  adminStats.innerHTML = `
    <article class="admin-stat"><span>${t('adminStatPrayers')}</span><strong>${stats.prayers}</strong></article>
    <article class="admin-stat"><span>${t('adminStatDeletedPrayers')}</span><strong>${stats.deletedPrayers}</strong></article>
    <article class="admin-stat"><span>${t('adminStatEvents')}</span><strong>${stats.events}</strong></article>
    <article class="admin-stat"><span>${t('adminStatMembers')}</span><strong>${stats.members}</strong></article>
    <article class="admin-stat"><span>${t('adminStatPending')}</span><strong>${stats.pendingMembers}</strong></article>
    <article class="admin-stat"><span>${t('adminStatApproved')}</span><strong>${stats.approvedMembers}</strong></article>
    <article class="admin-stat"><span>${t('adminStatVisits')}</span><strong>${stats.visits}</strong></article>
    <article class="admin-stat"><span>${t('adminStatResources')}</span><strong>${stats.resources}</strong></article>
    <article class="admin-stat"><span>${t('adminStatActiveLinks')}</span><strong>${stats.activeLinks}</strong></article>
    <article class="admin-stat"><span>${t('adminStatInquiries')}</span><strong>${stats.inquiries}</strong></article>
  `;
}

async function loadApprovedMembers() {
  if (!memberSelect) {
    return;
  }

  const members = await api('/api/admin/members?status=approved');
  memberSelect.innerHTML = members.map((member) => (
    `<option value="${member.id}">${escapeHtml(member.fullName)} (${escapeHtml(member.email)})</option>`
  )).join('');

  if (members.length === 0) {
    memberSelect.innerHTML = `<option value="">${t('adminNoApprovedMembers')}</option>`;
  }
}

async function loadMemberLinks() {
  if (!memberLinksList) {
    return;
  }

  const links = await api('/api/admin/member-links');
  memberLinksList.innerHTML = links.map((link) => {
    const fullLink = `${window.location.origin}/community?access=${link.token}`;
    const status = link.usedAt
      ? t('adminStatusUsed')
      : new Date(link.expiresAt).getTime() < Date.now()
        ? t('adminStatusExpired')
        : t('adminStatusActive');

    return `
      <article class="admin-item">
        <div>
          <p class="section-tag">${escapeHtml(status)}</p>
          <h3>${escapeHtml(link.fullName)}</h3>
          <p>${escapeHtml(link.email)}</p>
          <p>${t('adminMemberExpires')} ${escapeHtml(new Date(link.expiresAt).toLocaleString())}</p>
          <p class="admin-link">${escapeHtml(fullLink)}</p>
        </div>
        <div class="admin-item__actions">
          <button class="button button--secondary copy-member-link" type="button" data-link="${escapeHtml(fullLink)}">${t('adminMemberCopyLink')}</button>
          <a class="button button--secondary" href="${escapeHtml(fullLink)}" target="_blank" rel="noreferrer">${t('adminMemberOpen')}</a>
        </div>
      </article>
    `;
  }).join('') || `<p class="empty-state">${t('adminMemberLinksEmpty')}</p>`;

  memberLinksList.querySelectorAll('.copy-member-link').forEach((button) => {
    button.addEventListener('click', async () => {
      const link = button.dataset.link || '';
      if (!link) {
        return;
      }
      try {
        await navigator.clipboard.writeText(link);
        button.textContent = t('adminMemberCopied');
        setTimeout(() => {
          button.textContent = t('adminMemberCopyLink');
        }, 1800);
      } catch {
        button.textContent = t('adminMemberCopyFailed');
      }
    });
  });
}

async function loadInquiries() {
  if (!inquiryList) {
    return;
  }

  const inquiries = await api('/api/admin/inquiries');
  inquiryList.innerHTML = inquiries.map((inquiry) => {
    const status = inquiry.status === 'approved' || inquiry.status === 'rejected' ? inquiry.status : 'pending';
    const statusLabelKey = status === 'approved'
      ? 'adminInquiryApproved'
      : status === 'rejected'
        ? 'adminInquiryRejected'
        : 'adminInquiryPending';
    const statusLabel = t(statusLabelKey);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inquiry.email)}&su=${encodeURIComponent('Re: ' + inquiry.subject)}&body=${encodeURIComponent('Dear ' + inquiry.name + ',\n\n')}`;
    return `
    <article class="admin-item">
      <div>
        <p class="section-tag">${new Date(inquiry.createdAt).toLocaleString()}</p>
        <p class="section-tag">${t('adminInquiryStatus')}: ${escapeHtml(statusLabel)}</p>
        <h3>${escapeHtml(inquiry.subject)}</h3>
        <p><strong>${t('adminInquiryFrom')}:</strong> ${escapeHtml(inquiry.name)} &lt;${escapeHtml(inquiry.email)}&gt;</p>
        <p style="white-space: pre-wrap;">${escapeHtml(inquiry.message)}</p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--secondary update-inquiry-status" type="button" data-id="${inquiry.id}" data-status="pending" ${status === 'pending' ? 'disabled' : ''}>${t('adminInquiryMarkPending')}</button>
        <button class="button button--secondary update-inquiry-status" type="button" data-id="${inquiry.id}" data-status="approved" ${status === 'approved' ? 'disabled' : ''}>${t('adminInquiryApprove')}</button>
        <button class="button button--secondary update-inquiry-status" type="button" data-id="${inquiry.id}" data-status="rejected" ${status === 'rejected' ? 'disabled' : ''}>${t('adminInquiryReject')}</button>
        <a class="share-link" href="${escapeHtml(gmailUrl)}" target="_blank" rel="noreferrer">${t('adminInquiryReply')}</a>
        <button class="button button--secondary delete-inquiry" type="button" data-id="${inquiry.id}">${t('adminInquiryDelete')}</button>
      </div>
    </article>`;
  }).join('') || `<p class="empty-state">${t('adminInquiryEmpty')}</p>`;

  inquiryList.querySelectorAll('.update-inquiry-status').forEach((button) => {
    button.addEventListener('click', async () => {
      const inquiryId = button.dataset.id;
      const status = button.dataset.status;

      if (!inquiryId || !status) {
        return;
      }

      try {
        await api(`/api/admin/inquiries/${inquiryId}/status`, {
          method: 'PATCH',
          body: { status },
        });
        await loadInquiries();
      } catch (error) {
        alert(error instanceof Error ? error.message : t('adminInquiryUpdateFailed'));
      }
    });
  });

  inquiryList.querySelectorAll('.delete-inquiry').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!window.confirm(t('adminInquiryDeleteConfirm'))) return;
      try {
        await api(`/api/admin/inquiries/${button.dataset.id}`, { method: 'DELETE' });
        await Promise.all([loadInquiries(), loadOverview()]);
      } catch (error) {
        alert(error instanceof Error ? error.message : t('adminInquiryDeleteFailed'));
      }
    });
  });
}

async function loadResources() {
  if (!resourceList) {
    return;
  }

  const resources = await api('/api/admin/resources');
  resourceList.innerHTML = resources.map((resource) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(resource.type)}</p>
        <h3>${escapeHtml(resource.title)}</h3>
        <p>${escapeHtml(resource.description || '')}</p>
        <p><a href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">${escapeHtml(resource.url)}</a></p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--secondary delete-resource" type="button" data-id="${resource.id}">${t('adminResourceDelete')}</button>
      </div>
    </article>
  `).join('') || `<p class="empty-state">${t('adminResourceEmpty')}</p>`;

  resourceList.querySelectorAll('.delete-resource').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm(t('adminResourceDeleteConfirm'));
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/resources/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadResources(), loadOverview()]);
      } catch (error) {
        resourceFeedback.textContent = error instanceof Error ? error.message : t('adminResourceDeleteFailed');
      }
    });
  });
}

async function loadGallery() {
  if (!galleryList) {
    return;
  }

  const media = await api('/api/admin/gallery');
  galleryList.innerHTML = media.map((item) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(item.mediaType)}</p>
        <h3>${escapeHtml(item.title || '')}</h3>
        <p>${escapeHtml(item.caption || '')}</p>
        ${item.mediaType === 'video'
          ? `<video controls preload="metadata" style="max-width: 320px; border-radius: 0.8rem; background: #000;"><source src="${escapeHtml(item.mediaUrl)}"></video>`
          : `<p><img src="${escapeHtml(item.mediaUrl)}" alt="${escapeHtml(item.title || '')}" style="max-width: 220px; border-radius: 0.8rem;"></p>`}
      </div>
      <div class="admin-item__actions">
        <button class="button button--secondary delete-gallery-item" type="button" data-id="${item.id}">${t('adminGalleryDelete')}</button>
      </div>
    </article>
  `).join('') || `<p class="empty-state">${t('adminGalleryEmpty')}</p>`;

  galleryList.querySelectorAll('.delete-gallery-item').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm(t('adminGalleryDeleteConfirm'));
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/gallery/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await loadGallery();
      } catch (error) {
        if (galleryFeedback) {
          galleryFeedback.textContent = error instanceof Error ? error.message : t('adminGalleryDeleteFailed');
        }
      }
    });
  });
}

async function loadEvents() {
  if (!eventAdminList) {
    return;
  }

  const events = await api('/api/admin/events');
  eventAdminList.innerHTML = events.map((eventItem) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(eventItem.isPublished ? t('adminEventPublished') : t('adminEventDraft'))}</p>
        <h3>${escapeHtml(eventItem.title)}</h3>
        <p>${escapeHtml(eventItem.category)}</p>
        <p><strong>${escapeHtml(eventItem.eventDate)} ${escapeHtml(eventItem.eventStartTime)}${eventItem.eventEndTime ? ` - ${escapeHtml(eventItem.eventEndTime)}` : ''}</strong></p>
        <p>${escapeHtml(eventItem.location || t('adminEventNoLocation'))}</p>
        <p>${escapeHtml(eventItem.details)}</p>
        ${eventItem.documentUrl ? `<p><a href="${escapeHtml(eventItem.documentUrl)}" target="_blank" rel="noreferrer">${escapeHtml(eventItem.documentName || 'Open document')}</a></p>` : ''}
        ${eventItem.externalLink ? `<p><a href="${escapeHtml(eventItem.externalLink)}" target="_blank" rel="noreferrer">${escapeHtml(eventItem.externalLink)}</a></p>` : ''}
      </div>
      <div class="admin-item__actions">
        <button
          class="button button--secondary admin-edit-event"
          type="button"
          data-id="${eventItem.id}"
          data-title="${escapeHtml(eventItem.title)}"
          data-category="${escapeHtml(eventItem.category)}"
          data-eventdate="${escapeHtml(eventItem.eventDate)}"
          data-eventstarttime="${escapeHtml(eventItem.eventStartTime)}"
          data-eventendtime="${escapeHtml(eventItem.eventEndTime || '')}"
          data-location="${escapeHtml(eventItem.location || '')}"
          data-details="${escapeHtml(eventItem.details)}"
          data-ispublished="${eventItem.isPublished ? 'true' : 'false'}"
          data-documenturl="${escapeHtml(eventItem.documentUrl || '')}"
          data-documentname="${escapeHtml(eventItem.documentName || '')}"
          data-externallink="${escapeHtml(eventItem.externalLink || '')}"
        >${t('adminEventEdit')}</button>
        <button class="button button--secondary admin-toggle-event-publish" type="button" data-id="${eventItem.id}" data-ispublished="${eventItem.isPublished ? 'true' : 'false'}">${eventItem.isPublished ? t('adminEventHide') : t('adminEventPost')}</button>
        <button class="button button--secondary admin-delete-event" type="button" data-id="${eventItem.id}">${t('adminEventDelete')}</button>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No events published yet.</p>';

  eventAdminList.querySelectorAll('.admin-edit-event').forEach((button) => {
    button.addEventListener('click', () => {
      fillEventForm({
        id: Number(button.dataset.id),
        title: button.dataset.title || '',
        category: button.dataset.category || '',
        eventDate: button.dataset.eventdate || '',
        eventStartTime: button.dataset.eventstarttime || '',
        eventEndTime: button.dataset.eventendtime || '',
        location: button.dataset.location || '',
        details: button.dataset.details || '',
        isPublished: button.dataset.ispublished === 'true',
        documentUrl: button.dataset.documenturl || '',
        documentName: button.dataset.documentname || '',
        externalLink: button.dataset.externallink || '',
      });
      eventFeedback.textContent = `${t('adminEventEditing')}: ${button.dataset.title || ''}`;
    });
  });

  eventAdminList.querySelectorAll('.admin-delete-event').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm(t('adminEventDeleteConfirm'));
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/events/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadEvents(), loadOverview()]);
      } catch (error) {
        eventFeedback.textContent = error instanceof Error ? error.message : t('adminEventDeleteFailed');
      }
    });
  });

  eventAdminList.querySelectorAll('.admin-toggle-event-publish').forEach((button) => {
    button.addEventListener('click', async () => {
      const nextPublishedState = button.dataset.ispublished !== 'true';

      try {
        await api(`/api/admin/events/${button.dataset.id}/publish`, {
          method: 'PATCH',
          body: JSON.stringify({ isPublished: nextPublishedState }),
        });
        await Promise.all([loadEvents(), loadOverview()]);
      } catch (error) {
        eventFeedback.textContent = error instanceof Error ? error.message : t('adminEventPublishFailed');
      }
    });
  });
}

async function loadPrayers() {
  if (!prayerAdminList) {
    return;
  }

  const prayers = await api('/api/admin/prayers');
  prayerAdminList.innerHTML = prayers.map((prayer) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(prayer.category)}</p>
        <h3>${escapeHtml(prayer.title)}</h3>
        <p><strong>${escapeHtml(prayer.scheduledFor)}</strong></p>
        <p>${escapeHtml(prayer.content)}</p>
      </div>
      ${renderPrayerActions(prayer)}
    </article>
  `).join('') || `<p class="empty-state">${t('adminPrayerEmpty')}</p>`;

  prayerAdminList.querySelectorAll('.admin-edit-prayer').forEach((button) => {
    button.addEventListener('click', () => {
      const prayer = {
        id: Number(button.dataset.id),
        title: button.dataset.title || '',
        category: button.dataset.category || '',
        scheduledFor: button.dataset.scheduledfor || '',
        content: button.dataset.content || '',
      };

      fillPrayerForm(prayer);
      prayerFeedback.textContent = `${t('adminPrayerEditing')}: ${prayer.title}`;
    });
  });

  prayerAdminList.querySelectorAll('.admin-delete-prayer').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm(t('adminPrayerDeleteConfirm'));
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/prayers/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadPrayers(), loadDeletedPrayers(), loadOverview()]);
      } catch (error) {
        prayerFeedback.textContent = error instanceof Error ? error.message : t('adminPrayerDeleteFailed');
      }
    });
  });
}

async function loadDeletedPrayers() {
  if (!prayerTrashList) {
    return;
  }

  const deletedPrayers = await api('/api/admin/prayers/deleted');

  prayerTrashList.innerHTML = deletedPrayers.map((prayer) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${t('adminPrayerDeletedTag')}</p>
        <h3>${escapeHtml(prayer.title)}</h3>
        <p><strong>${escapeHtml(prayer.scheduledFor)}</strong></p>
        <p>${escapeHtml(prayer.content)}</p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--primary restore-prayer" type="button" data-id="${prayer.id}">${t('adminPrayerRestore')}</button>
      </div>
    </article>
  `).join('') || `<p class="empty-state">${t('adminPrayerTrashEmpty')}</p>`;

  prayerTrashList.querySelectorAll('.restore-prayer').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await api(`/api/admin/prayers/${button.dataset.id}/restore`, {
          method: 'POST',
        });
        prayerFeedback.textContent = t('adminPrayerRestored');
        await Promise.all([loadPrayers(), loadDeletedPrayers(), loadOverview()]);
      } catch (error) {
        prayerFeedback.textContent = error instanceof Error ? error.message : t('adminPrayerRestoreFailed');
      }
    });
  });
}

async function loadRegistrations() {
  const registrations = await api('/api/admin/registrations?status=all');
  
    // Sort pending to top
    const sorted = registrations.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0;
    });
  registrationList.innerHTML = sorted.map((registration) => `
    <article class="admin-item">
      <div>
        <p class="section-tag" style="${registration.status === 'pending' ? 'background-color: #fff3cd; color: #856404;' : registration.status === 'approved' ? 'background-color: #d4edda; color: #155724;' : 'background-color: #f8d7da; color: #721c24;'} padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; font-size: 0.85rem;">${escapeHtml(registration.status.toUpperCase())}</p>
        <h3>${escapeHtml(registration.fullName)}</h3>
        <p>${escapeHtml(registration.email)}</p>
        <p>${escapeHtml(registration.phone || t('adminRegNoPhone'))}</p>
        <p>${escapeHtml(registration.city || t('adminRegNoCity'))}</p>
        <p>${escapeHtml(registration.message || t('adminRegNoMessage'))}</p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--primary admin-registration-status" type="button" data-id="${registration.id}" data-status="approved">${t('adminRegApprove')}</button>
        <button class="button button--secondary admin-registration-status" type="button" data-id="${registration.id}" data-status="rejected">${t('adminRegReject')}</button>
        ${registration.status !== 'pending' ? `<button class="button button--secondary admin-registration-status" type="button" data-id="${registration.id}" data-status="pending">${t('adminRegUndo')}</button>` : ''}
        <button class="button button--secondary admin-registration-delete" type="button" data-id="${registration.id}">${t('adminRegDelete')}</button>
      </div>
    </article>
  `).join('') || `<p class="empty-state">${t('adminRegEmpty')}</p>`;

  registrationList.querySelectorAll('.admin-registration-status').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await api(`/api/admin/registrations/${button.dataset.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: button.dataset.status }),
        });
        await Promise.all([loadRegistrations(), loadOverview()]);
      } catch (error) {
        loginFeedback.textContent = error instanceof Error ? error.message : t('adminRegStatusFailed');
      }
    });
  });

  registrationList.querySelectorAll('.admin-registration-delete').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm(t('adminRegDeleteConfirm'));
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/registrations/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadRegistrations(), loadOverview()]);
      } catch (error) {
        loginFeedback.textContent = error instanceof Error ? error.message : t('adminRegDeleteFailed');
      }
    });
  });
}

  async function loadAccessRequests() {
    const requests = await api('/api/admin/access-requests?status=pending');
  
    accessRequestsList.innerHTML = requests.map((request) => `
      <article class="admin-item">
        <div>
          <p class="section-tag" style="background-color: #fff3cd; color: #856404; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; font-size: 0.85rem;">PENDING</p>
          <h3>${escapeHtml(request.fullName)}</h3>
          <p>${escapeHtml(request.email)}</p>
          <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">From: ${escapeHtml(request.ipAddress || 'Unknown')}</p>
          <p style="font-size: 0.85rem; color: #666;">Requested: ${new Date(request.createdAt).toLocaleString()}</p>
        </div>
        <div class="admin-item__actions">
          <button class="button button--primary admin-access-request-approve" type="button" data-id="${request.id}" data-email="${escapeHtml(request.email)}">Approve</button>
          <button class="button button--secondary admin-access-request-reject" type="button" data-id="${request.id}">Reject</button>
        </div>
      </article>
    `).join('') || '<p class="empty-state">No pending access requests.</p>';

    accessRequestsList.querySelectorAll('.admin-access-request-approve').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          await api(`/api/admin/access-requests/${button.dataset.id}/approve`, {
            method: 'POST',
          });
          loginFeedback.textContent = 'Access request approved. New member account created.';
          loginFeedback.style.color = '#0a7e4f';
          await Promise.all([loadAccessRequests(), loadOverview()]);
        } catch (error) {
          loginFeedback.textContent = error instanceof Error ? error.message : 'Failed to approve request.';
          loginFeedback.style.color = '#c41e3a';
        }
      });
    });

    accessRequestsList.querySelectorAll('.admin-access-request-reject').forEach((button) => {
      button.addEventListener('click', async () => {
        const confirmed = window.confirm('Reject this access request?');
        if (!confirmed) {
          return;
        }

        try {
          await api(`/api/admin/access-requests/${button.dataset.id}/reject`, {
            method: 'POST',
          });
          loginFeedback.textContent = 'Access request rejected.';
          loginFeedback.style.color = '#0a7e4f';
          await Promise.all([loadAccessRequests(), loadOverview()]);
        } catch (error) {
          loginFeedback.textContent = error instanceof Error ? error.message : 'Failed to reject request.';
          loginFeedback.style.color = '#c41e3a';
        }
      });
    });
  }

async function loadVisitors() {
  const visitors = await api('/api/admin/visitors?limit=50');
  visitorList.innerHTML = visitors.map((visitor) => `
    <tr>
      <td>${escapeHtml(new Date(visitor.visitedAt).toLocaleString())}</td>
      <td>${escapeHtml(visitor.pagePath)}</td>
      <td>${escapeHtml(visitor.referrer || '-')}</td>
      <td>${escapeHtml(visitor.ipAddress || '-')}</td>
      <td>${escapeHtml(visitor.userAgent || '-')}</td>
    </tr>
  `).join('') || `<tr><td colspan="5">${t('adminVisitorEmpty')}</td></tr>`;
}

async function loadSystemLogs() {
  if (!systemLogList) {
    return;
  }

  const logs = await api('/api/admin/logs?limit=200');
  systemLogList.innerHTML = logs.map((log) => `
    <tr>
      <td>${escapeHtml(new Date(log.createdAt).toLocaleString())}</td>
      <td>${escapeHtml(log.source || '-')}</td>
      <td>${escapeHtml(log.eventType || '-')}</td>
      <td>${escapeHtml(`${log.actorRole || 'guest'}:${log.actorName || 'unknown'}`)}</td>
      <td>${escapeHtml(log.method || '-')}</td>
      <td>${escapeHtml(log.path || '-')}</td>
      <td>${escapeHtml(String(log.statusCode ?? '-'))}</td>
      <td>${escapeHtml(log.details || '-')}</td>
    </tr>
  `).join('') || `<tr><td colspan="8">${t('adminLogEmpty')}</td></tr>`;
}

async function loadHomepageEditorContent() {
  if (!homepageIndexSource || !homepageScriptSource || !homepageEditorFeedback) {
    return;
  }

  homepageEditorFeedback.textContent = t('adminHomeEditorLoading');

  try {
    const content = await api('/api/admin/homepage-content');
    homepageIndexSource.value = typeof content.indexHtml === 'string' ? content.indexHtml : '';
    homepageScriptSource.value = typeof content.scriptJs === 'string' ? content.scriptJs : '';
    homepageEditorFeedback.textContent = t('adminHomeEditorLoaded');
  } catch (error) {
    homepageEditorFeedback.textContent = error instanceof Error ? error.message : t('adminHomeEditorFailed');
  }
}

function formatBackupReason(reason) {
  if (reason === 'manual') {
    return t('adminBackupManual');
  }
  if (reason === 'scheduled') {
    return t('adminBackupScheduled');
  }
  if (reason === 'startup') {
    return t('adminBackupStartup');
  }
  return t('adminBackupUnknownReason');
}

async function loadBackups() {
  if (!backupList || !backupFeedback || !backupPath) {
    return;
  }

  backupFeedback.textContent = t('adminBackupLoading');

  try {
    const result = await api('/api/admin/backups');
    const snapshots = Array.isArray(result.snapshots) ? result.snapshots : [];
    const resolvedBackupDir = typeof result.backupDir === 'string' && result.backupDir.trim()
      ? result.backupDir
      : t('adminBackupPathUnavailable');
    backupPath.textContent = resolvedBackupDir;

    backupList.innerHTML = snapshots.map((snapshot) => {
      const createdLabel = new Date(snapshot.createdAt).toLocaleString();
      const reasonLabel = formatBackupReason(snapshot.reason);

      return `
        <article class="admin-item">
          <div>
            <p class="section-tag">${escapeHtml(snapshot.name)}</p>
            <p><strong>${t('adminBackupCreatedAt')}:</strong> ${escapeHtml(createdLabel)}</p>
            <p><strong>${t('adminBackupReason')}:</strong> ${escapeHtml(reasonLabel)}</p>
          </div>
          <div class="admin-item__actions">
            <button class="button button--secondary restore-backup" type="button" data-snapshot="${escapeHtml(snapshot.name)}">${t('adminBackupRestore')}</button>
          </div>
        </article>
      `;
    }).join('') || `<p class="empty-state">${t('adminBackupEmpty')}</p>`;

    backupList.querySelectorAll('.restore-backup').forEach((button) => {
      button.addEventListener('click', async () => {
        const snapshotName = button.dataset.snapshot;
        if (!snapshotName) {
          return;
        }

        const confirmed = window.confirm(t('adminBackupRestoreConfirm'));
        if (!confirmed) {
          return;
        }

        backupFeedback.textContent = t('adminBackupLoading');

        try {
          await api('/api/admin/backups/restore', {
            method: 'POST',
            body: JSON.stringify({ snapshotName }),
          });
          backupFeedback.textContent = t('adminBackupRestoreStarted');
          window.setTimeout(() => {
            window.location.reload();
          }, 6000);
        } catch (error) {
          backupFeedback.textContent = error instanceof Error ? error.message : t('adminBackupRestoreFailed');
        }
      });
    });

    backupFeedback.textContent = '';
  } catch (error) {
    backupPath.textContent = t('adminBackupPathUnavailable');
    backupFeedback.textContent = error instanceof Error ? error.message : t('adminBackupRestoreFailed');
  }
}

async function hydrateDashboard() {
  await Promise.all([
    loadOverview(),
    loadBackups(),
    loadPrayers(),
    loadDeletedPrayers(),
    loadEvents(),
    loadRegistrations(),
      loadAccessRequests(),
    loadVisitors(),
    loadSystemLogs(),
    loadApprovedMembers(),
    loadMemberLinks(),
    loadResources(),
    loadGallery(),
    loadInquiries(),
  ]);

  await loadHomepageEditorContent();
}

if (loginForm && loginFeedback) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);

    loginFeedback.textContent = t('adminSigningIn');

    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const session = await api('/api/admin/session');
      setAuthenticated(session);
      loginFeedback.textContent = '';
      loginForm.reset();
      await hydrateDashboard();
    } catch (error) {
      loginFeedback.textContent = error instanceof Error ? error.message : t('adminLoginFailed');
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST' });
    setLoggedOut();
  });
}

if (prayerForm && prayerFeedback) {
  prayerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(prayerForm);
    const id = formData.get('id');
    const payload = {
      title: formData.get('title'),
      category: formData.get('category'),
      scheduledFor: formData.get('scheduledFor'),
      content: formData.get('content'),
    };

    prayerFeedback.textContent = t('adminPrayerSaving');

    try {
      await api(id ? `/api/admin/prayers/${id}` : '/api/admin/prayers', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      resetPrayerForm();
      prayerFeedback.textContent = t('adminPrayerSaved');
      await Promise.all([loadPrayers(), loadOverview()]);
    } catch (error) {
      prayerFeedback.textContent = error instanceof Error ? error.message : t('adminPrayerSaveFailed');
    }
  });
}

if (prayerReset) {
  prayerReset.addEventListener('click', () => {
    resetPrayerForm();
  });
}

if (eventForm && eventFeedback) {
  resetEventForm();

  eventForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const id = formData.get('id');

    eventFeedback.textContent = t('adminEventSaving');

    try {
      const response = await fetch(id ? `/api/admin/events/${id}` : '/api/admin/events', {
        method: id ? 'PUT' : 'POST',
        credentials: 'include',
        body: formData,
      });

      const hasJson = response.headers.get('content-type')?.includes('application/json');
      const payload = hasJson ? await response.json() : null;

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          forceRelogin(payload?.error || null);
        }
        throw new Error(payload?.error || payload?.message || t('adminEventSaveFailed'));
      }

      resetEventForm();
      eventFeedback.textContent = t('adminEventSaved');
      await Promise.all([loadEvents(), loadOverview()]);
    } catch (error) {
      eventFeedback.textContent = error instanceof Error ? error.message : t('adminEventSaveFailed');
    }
  });
}

if (eventReset) {
  eventReset.addEventListener('click', () => {
    resetEventForm();
  });
}

if (eventNewButton) {
  eventNewButton.addEventListener('click', () => {
    resetEventForm();
    eventFeedback.textContent = t('adminEventCreatingNew');
  });
}

if (memberLinkForm && memberLinkFeedback) {
  memberLinkForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(memberLinkForm);

    memberLinkFeedback.textContent = t('adminMemberGenerating');

    try {
      const result = await api('/api/admin/member-links', {
        method: 'POST',
        body: JSON.stringify({
          userId: Number(data.get('userId')),
          expiresInDays: Number(data.get('expiresInDays')),
        }),
      });

      memberLinkFeedback.textContent = `${t('adminMemberLinkCreated')} ${result.member.fullName}`;
      await Promise.all([loadMemberLinks(), loadOverview()]);
    } catch (error) {
      memberLinkFeedback.textContent = error instanceof Error ? error.message : t('adminMemberGenFailed');
    }
  });
}

if (resourceForm && resourceFeedback) {
  resourceForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(resourceForm);
    const selectedType = String(data.get('type') || '');
    const selectedFile = data.get('document');
    const selectedUrl = String(data.get('url') || '').trim();

    if (selectedType === 'video' && selectedFile instanceof File && selectedFile.size > 0) {
      resourceFeedback.textContent = 'Video resources cannot include an uploaded document file.';
      return;
    }

    if (selectedType === 'document') {
      const hasFile = selectedFile instanceof File && selectedFile.size > 0;
      if (!hasFile && !selectedUrl) {
        resourceFeedback.textContent = 'For document resources, upload a file or provide a URL.';
        return;
      }

      if (hasFile) {
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        const fileName = selectedFile.name.toLowerCase();
        const hasAllowedExtension = allowedExtensions.some((extension) => fileName.endsWith(extension));
        if (!hasAllowedExtension) {
          resourceFeedback.textContent = 'Unsupported file type. Upload PDF, DOC, or DOCX.';
          return;
        }

        const maxBytes = 20 * 1024 * 1024;
        if (selectedFile.size > maxBytes) {
          resourceFeedback.textContent = 'File is too large. Maximum allowed size is 20MB.';
          return;
        }
      }
    }

    resourceFeedback.textContent = t('adminResourcePublishing');
    let requestTimeout;

    try {
      const controller = new AbortController();
      requestTimeout = window.setTimeout(() => controller.abort(), 300000);
      const response = await fetch('/api/admin/resources', {
        method: 'POST',
        credentials: 'include',
        signal: controller.signal,
        body: data,
      });

      const hasJson = response.headers.get('content-type')?.includes('application/json');
      const payload = hasJson ? await response.json() : null;

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          forceRelogin(payload?.error || null);
        }
        throw new Error(payload?.error || payload?.message || t('adminResourcePublishFailed'));
      }

      resourceFeedback.textContent = t('adminResourcePublished');
      resourceForm.reset();
      await Promise.all([loadResources(), loadOverview()]);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        resourceFeedback.textContent = 'Resource upload timed out after 5 minutes. Please check your file size/network and try again.';
      } else {
        resourceFeedback.textContent = error instanceof Error ? error.message : t('adminResourcePublishFailed');
      }
    } finally {
      if (requestTimeout) {
        window.clearTimeout(requestTimeout);
      }
    }
  });
}

if (galleryForm && galleryFeedback) {
  galleryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(galleryForm);

    galleryFeedback.textContent = t('adminGalleryUploading');

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      const hasJson = response.headers.get('content-type')?.includes('application/json');
      const payload = hasJson ? await response.json() : null;

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          forceRelogin(payload?.error || null);
        }
        throw new Error(payload?.error || payload?.message || t('adminGalleryUploadFailed'));
      }

      galleryFeedback.textContent = t('adminGalleryUploaded');
      galleryForm.reset();
      await loadGallery();
    } catch (error) {
      galleryFeedback.textContent = error instanceof Error ? error.message : t('adminGalleryUploadFailed');
    }
  });
}

if (homepageEditorLoadButton) {
  homepageEditorLoadButton.addEventListener('click', async () => {
    await loadHomepageEditorContent();
  });
}

if (backupRefreshButton) {
  backupRefreshButton.addEventListener('click', async () => {
    await loadBackups();
  });
}

if (backupCreateButton) {
  backupCreateButton.addEventListener('click', async () => {
    if (!backupFeedback) {
      return;
    }

    backupFeedback.textContent = t('adminBackupCreating');

    try {
      await api('/api/admin/backups/create', {
        method: 'POST',
      });
      await loadBackups();
      backupFeedback.textContent = t('adminBackupCreated');
    } catch (error) {
      backupFeedback.textContent = error instanceof Error ? error.message : t('adminBackupRestoreFailed');
    }
  });
}

if (homepageEditorForm && homepageEditorFeedback && homepageIndexSource && homepageScriptSource) {
  homepageEditorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    homepageEditorFeedback.textContent = t('adminHomeEditorSaving');

    try {
      await api('/api/admin/homepage-content', {
        method: 'PUT',
        body: JSON.stringify({
          indexHtml: homepageIndexSource.value,
          scriptJs: homepageScriptSource.value,
        }),
      });
      homepageEditorFeedback.textContent = t('adminHomeEditorSaved');
    } catch (error) {
      homepageEditorFeedback.textContent = error instanceof Error ? error.message : t('adminHomeEditorFailed');
    }
  });
}

if (homepageTextReplaceForm && homepageTextReplaceFeedback && homepageReplaceFind && homepageReplaceWith) {
  homepageTextReplaceForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const findText = homepageReplaceFind.value;
    const replaceText = homepageReplaceWith.value;

    if (!findText) {
      return;
    }

    homepageTextReplaceFeedback.textContent = t('adminHomeEditorLoading');

    try {
      const content = await api('/api/admin/homepage-content');
      const originalIndex = typeof content.indexHtml === 'string' ? content.indexHtml : '';
      const originalScript = typeof content.scriptJs === 'string' ? content.scriptJs : '';

      const indexResult = replaceTextInSource(originalIndex, findText, replaceText);
      const scriptResult = replaceTextInSource(originalScript, findText, replaceText);

      if (indexResult.replacements + scriptResult.replacements === 0) {
        homepageTextReplaceFeedback.textContent = t('adminHomeReplaceNotFound');
        return;
      }

      await api('/api/admin/homepage-content', {
        method: 'PUT',
        body: JSON.stringify({
          indexHtml: indexResult.updatedSource,
          scriptJs: scriptResult.updatedSource,
        }),
      });

      if (homepageIndexSource && homepageScriptSource) {
        homepageIndexSource.value = indexResult.updatedSource;
        homepageScriptSource.value = scriptResult.updatedSource;
      }

      homepageTextReplaceFeedback.textContent = `${t('adminHomeReplaceSaved')} (${indexResult.replacements + scriptResult.replacements})`;
      homepageReplaceFind.value = '';
      homepageReplaceWith.value = '';
    } catch (error) {
      homepageTextReplaceFeedback.textContent = error instanceof Error ? error.message : t('adminHomeEditorFailed');
    }
  });
}

(async function init() {
  try {
    const session = await api('/api/admin/session');
    setAuthenticated(session);
    await hydrateDashboard();
  } catch {
    setLoggedOut();
  }
})();