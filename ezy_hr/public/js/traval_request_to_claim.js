frappe.ui.form.on('Travel Request', {
    refresh(frm){
        if(frm.doc.docstatus==1){
            frm.add_custom_button(__('Create Expense Claim'),function(){
                get_doc(cur_frm.doc).then(
                    function(result){
                        frappe.model.with_doctype('Expense Claim',function(){
                            var exp_claim = frappe.model.get_new_doc('Expense Claim');
                            exp_claim.employee = frm.doc.employee

                            result.forEach(element => {
                                var expence_child = frappe.model.add_child(exp_claim,"expenses");
                                expence_child.expense_date = currentDate = new Date().toJSON().slice(0, 10);
                                expence_child.expense_type = element.expense_type
                                expence_child.amount = element.total_amount

                            });
                        
                            frappe.set_route('Form','Expense Claim',exp_claim.name);
                    });                       
                });               
            }).addClass('btn-primary');
        }     
    }       
    });
    
    var get_doc = function(mydocname){
        var stk ;
        return new Promise(function(resolve){
            frappe.call({
                'method':'ezy_hr.expense_claim.get_travel_request',
                "args":{
                    doc:mydocname
                },
                "callback": function(response){
                    stk = response.message;
                    resolve(stk);
                }
            });
        });
    }







frappe.ui.form.on("Groupby Salary Summary", "refresh", function(frm) {
    frm.add_custom_button(__("Get Report "), function() {
        return frappe.call({
                method : "ezy_hr.group_salary_api.get_monthly_excel_report",
                args:{
                    "month":cur_frm.doc.month,
                    "year":cur_frm.doc.year,
                    "unit":cur_frm.doc.unit
                },
                callback: function(r) {
                    console.log(r)
                    // if (r.message==true){
                        window.open("https://hrms.pauljohnhotels.com"+r.message.file_name, '_blank').focus();
                    // }
                    // else{
                    //     console.log(r)
                    // }
        
    }
    })
    })
});
