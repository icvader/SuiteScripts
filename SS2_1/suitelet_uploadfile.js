/** 
 *@NApiVersion 2.1
 *@NScriptType Suitelet
*/
/*jshint esversion:9*/
define([
    'N/ui/serverWidget'
],
    (serverWidget) => {
        const onRequest = context => {
            let form = serverWidget.createForm({
                title: 'Upload File',
                hideNavBar: false
            });
            if (context.request.method === 'GET') {
                form.addField({
                    id: 'custpage_file',
                    type: serverWidget.FieldType.FILE,
                    label: 'Upload File',
                    isMandatory: true
                });
                form.addSubmitButton({
                    label: 'Upload File'
                });
            } else {
                let fileRec = context.request.files.custpage_file;
                fileRec.folder = 123456; //File cabinet internal id is required, change or use script parameter
                log.debug('File Details', fileRec);
                let fileId = fileRec.save();
                let savedFld = form.addField({
                    id: 'custpage_saved',
                    type: serverWidget.FieldType.TEXT,
                    label: 'File Saved Id'
                });
                savedFld.updateDisplayType({
                    displayType: serverWidget.displayType.INLINE
                });
                savedFld.defaultValue = fileId;
            }
            context.response.writePage(form);
            return;
        };

        return {
            onRequest:onRequest
        };
    }
);