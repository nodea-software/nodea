var NodeaTable = (function() {

	// =========================
	// DataTableBuilder "HOW TO"
	// =========================
	//
	// 1 : Configuration de la table
	// =============================
	// - L'element `table` DOIT avoir l'ID `example1`
	// - La table DOIT avoir un attribut `data-url` definissant la route que devra utiliser le
	//  plugin DataTables
	// - La table DOIT avoir un tag `thead` ayant la class `.main`
	//   - Les tags `th` de cet element doivent avoir un attribut `data-col`
	//      - Cet attribut `data-col` represente la colonne :
	//          - ex: th(data-col='nom')
	//   - Si la colonne affiche des dates, ajouter un attribut `data-type='date'` pour formater
	//   la date
	// - La table PEUX avoir un deuxieme tag `thead` ayant la class .filters
	//   - Les `th` compris dans cet element seront transforme en input de filtre
	//
	var STR_LANGUAGE;
	if (lang_user == "fr-FR") {
	    STR_LANGUAGE = {
	        "processing": "Traitement en cours...",
	        "search": "Rechercher&nbsp;:",
	        "lengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
	        "info": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
	        "infoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
	        "infoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
	        "infoPostFix": "",
	        "loadingRecords": "Chargement en cours...",
	        "zeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
	        "emptyTable": "Aucune donn&eacute;e disponible dans le tableau",
	        "reset_filter": "Réinitialiser les filtres",
	        "scroll_right": "Défilement à droite",
	        "download_file": "Télécharger le fichier",
	        "close": "Fermer",
	        "paginate": {
	            "first": "Premier",
	            "previous": "Pr&eacute;c&eacute;dent",
	            "next": "Suivant",
	            "last": "Dernier"
	        },
	        "aria": {
	            "sortAscending": ": activer pour trier la colonne par ordre croissant",
	            "sortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
	        },
	        "choose_columns": "Choix Colonnes",
	        "apply": "Appliquer",
	        "display": "Afficher",
	        "boolean_filter": {
	            "null": "Non renseigné",
	            "checked": "Coché",
	            "unchecked": "Décoché",
	            "all": "Tout"
	        }
	    };
	} else {
	    STR_LANGUAGE = {
	        "processing": "Processing...",
	        "search": "Search&nbsp;:",
	        "lengthMenu": "Display _MENU_ records",
	        "info": "Displaying records _START_ to _END_ on _TOTAL_ records",
	        "infoEmpty": "No record to display",
	        "infoFiltered": "(filter on _MAX_ records total)",
	        "infoPostFix": "",
	        "loadingRecords": "Loading...",
	        "zeroRecords": "No record to display",
	        "emptyTable": "No data available in this array",
	        "reset_filter": "Reset all filters",
	        "scroll_right": "Scroll right",
	        "download_file": "Download the file",
	        "close": "Close",
	        "paginate": {
	            "first": "First",
	            "previous": "Previous",
	            "next": "Next",
	            "last": "Last"
	        },
	        "aria": {
	            "sortAscending": ": click to sort column by ascending order",
	            "sortDescending": ": click to sort column by descending order"
	        },
	        "choose_columns": "Choose Columns",
	        "apply": "Apply",
	        "display": "Display",
	        "boolean_filter": {
	            "null": "Not specified",
	            "checked": "Checked",
	            "unchecked": "Unchecked",
	            "all": "Both"
	        }
	    };
	}

	// Dive trough the object to find the key we are looking for
	function diveObj(obj, keys, idx = 0){
	    if(!obj)
	        return '-';

	    if(Array.isArray(obj[keys[idx]]) && obj[keys[idx]].length > 0)
	        return diveObj(obj[keys[idx]][0], keys, ++idx);
	    else if(typeof obj[keys[idx]] === 'object')
	        return diveObj(obj[keys[idx]], keys, ++idx);
	    else if(obj[keys[idx]] && typeof obj[keys[idx]] !== undefined)
	        return obj;
	    else
	        return '-';
	}

	function mergedColumnTypes(customColumns) {
		if (!customColumns)
			return defaults.columns;
		const typeList = Object.entries({...defaults.columns, ...customColumns}).map(([key]) => key);
		const mergedTypes = {};
		for (const type in typeList)
			mergedTypes[type] = {
				...defaults.columns.default,
				...customColumns.default,
				...customColumns[type]
			}
		return mergedTypes;
	}

	// Generate the column selector on datatable button click
	//   - append an absolute div to the datalist button
	//   - display a list of the columns available on page load with a checkbox to hide/show each
	function generateColumnSelector(tableID) {
	    var storageColumnsHide = JSON.parse(localStorage.getItem("nodea_hidden_columns_save_" + tableID.substring(1)));
	    var table = $(tableID).data('table');
	    var columns = table.tableOptions.columns;

	    var tableHeight = $(tableID).height();
	    var columnsSelectorDiv = $(`<div id="columnSelector" style="height:${tableHeight}px;width:100%;overflow:auto;position:absolute;background: white;border: 1px solid grey;border-radius:5px;padding:10px;z-index:1000;"><h4 style="text-align:center;">${STR_LANGUAGE.display}</h4></div>`);

	    var columnsToHide = [];
	    // Loop over the <th> available on page load
	    for (var column of columns) {
	        // Column has been hidden through hide column instruction, never show
	        if (column.hidden)
	            continue;
	        // No selection if no text
	        if (column.element.text() === "")
	            continue;

	        (function (currentColumn) {
	            var element = currentColumn.element, show;
	            // If storageColumnsHide is null, it means it's the first use of this storage, all columns must be shown by default
                checked = storageColumnsHide == null || !storageColumnsHide.includes(currentColumn.data);
	            if (!checked)
	                columnsToHide.push(currentColumn.data);
	            var columnDiv = $(`<div><label><input class="form-control input" name="${currentColumn.data}" type="checkbox" data-col="${currentColumn.data}" ${checked ? 'checked': ''}>&nbsp;${element.text()}</label></div>`);
	            // Initialize column checkbox
	            var checkbox = columnDiv.find('input[type=checkbox]').icheck({checkboxClass: 'icheckbox_flat-blue',radioClass: 'iradio_flat-blue'});

	            // Bind hide/show trigger, build new columnsToHide array. Apply button will use this array
	            checkbox.on('ifToggled', function() {
	                // Hide by adding col to columnsToHide
	                if (!columnsToHide.includes(currentColumn.data))
	                    columnsToHide.push(currentColumn.data);
	                // Show by removing col from columnsToHide
	                else
	                    columnsToHide.splice(columnsToHide.indexOf(currentColumn.data), 1);
	            });
	            columnsSelectorDiv.append(columnDiv);

	        })(column);
	    }

	    // Create Apply button and bind click
	    var applyBtn = $('<div style="text-align:center;margin-top:5px;margin-bottom:5px;"><button class="btn btn-primary btn-sm">'+STR_LANGUAGE.apply+'</button></div>');
	    applyBtn.click(function(){
	        // Set new filters to localStorage and reload
	        localStorage.setItem("nodea_hidden_columns_save_" + tableID.substring(1), JSON.stringify(columnsToHide));
	        setTimeout(function() {
	            location.reload();
	        }, 100);
	    });

	    columnsSelectorDiv.append(applyBtn)
	    return columnsSelectorDiv;
	}

	var defaults = {
		stateSaveCallback: (tableID, settings, data) => {
	        var sizes = [], allZero = true;
	        for (var i = 0; i < settings.aoColumns.length; i++) {
	            var size = $(settings.aoColumns[i].nTh).width();
	            if (size != 0)
	                allZero = false;
	            sizes.push(size+'px');
	        }
	        if (!allZero)
	            localStorage.setItem(tableID+'_columns_sizes', JSON.stringify(sizes));
	    },
		stateLoadCallback: (tableID, settings) => {
	        var sizes = JSON.parse(localStorage.getItem(tableID+'_columns_sizes'));
	        if (!sizes)
	            return;
	        var allWidthZero = true;
	        for (var i = 0; i < sizes.length; i++)
	            if (sizes[i] != '0px')
	                allWidthZero = false;
	        if (allWidthZero)
	            return;
	        for (var i = 0; i < settings.aoColumns.length; i++)
	            if (sizes[i])
	                $(settings.aoColumns[i].nTh).width(sizes[i]);
	    },
		saveFilterVal: (tableId, field, value) => {
		    var filterSave = JSON.parse(localStorage.getItem("nodea_filter_save_" + tableId));
		    if (filterSave == null)
		        filterSave = {};
		    filterSave[field] = value;
		    localStorage.setItem("nodea_filter_save_" + tableId, JSON.stringify(filterSave));
		},
		getFilterVal: (tableId, field) => {
		    var filterSave, val = "";
		    try {
		    	filterSave = JSON.parse(localStorage.getItem("nodea_filter_save_" + tableId));
			    if (filterSave != null && typeof filterSave[field] !== "undefined")
			        val = filterSave[field];
		    } catch(err) {
		    	console.warn("Couldn't parse saved filter "+field);
		    }
		    return val;
		},
	    columns: {
	    	date: {
	    		render: ({value, row, column, entity, additionalData}) => {
		            if (value != null && value != "" && value.toLowerCase() != "invalid date") {
		                var tmpDate = moment.utc(value);
		                if (!tmpDate.isValid())
		                    value = '-';
		                else {
		                    var format = lang_user == 'fr-FR' ? "DD/MM/YYYY" : "YYYY-MM-DD";
		                    value = tmpDate.format(format || "YYYY-MM-DD");
		                }
		            }
		            else
		                value = "-";
		            return value;
		        },
		        search: ({column, title, savedFilter, searchTh, triggerSearch, additionalData}) => {
					var element = $(`<input type="text" class="form-control input" value="${savedFilter}" placeholder="${title}" />`);
					var mask;
					if (lang_user == 'fr-FR')
						mask = {
							inputFormat: "dd/mm/yyyy",
							alias: 'datetime',
							placeholder: "jj/mm/aaaa"
						}
					else
						mask = {
							inputFormat: "yyyy-mm-dd",
							alias: 'datetime',
							placeholder: "yyyy-mm-dd"
						}
					element.inputmask(mask);
					element.on("keyup", function(){
			            var searchValue = element.inputmask('unmaskedvalue');
						if (!element.inputmask("isComplete") && searchValue !== '')
							return;
						if (lang_user == 'fr-FR') {
							var date = element.val().split("/");
							if (date.length > 1) {
								var newDate = date[2] + "-" + date[1] + "-" + date[0];

								searchValue = newDate;
							}
						}
			            triggerSearch(searchValue, 'date');
	                });
	                return element;
		    	}
	    	},
	    	datetime: {
	    		render: ({value, row, column, entity, additionalData}) => {
		            if (value != null && value != "" && value.toLowerCase() != "invalid date") {
		                var tmpDate = moment.utc(value);
		                if (!tmpDate.isValid())
		                    value = '-';
		                else {
		                    var format = lang_user == 'fr-FR' ? "DD/MM/YYYY HH:mm" : "YYYY-MM-DD HH:mm";
		                    value = tmpDate.format(format || "YYYY-MM-DD");
		                }
		            }
		            else
		                value = "-";
		            return value;
		        },
		        search: (data) => {
		    		return defaults.columns.date.search(data);
		    	}
	    	},
	    	time: {
	    		render: ({value, row, column, entity, additionalData}) => {
		            if(value && value.length == 8)
		                return value.substring(0, value.length - 3);
		            return value;
	        	},
	        	search: ({column, title, savedFilter, searchTh, triggerSearch, additionalData}) => {
					var element = $(`<input type="text" class="form-control input" value="${savedFilter}" placeholder="${title}" />`);
					element.inputmask({
	                    mask: "99:99", placeholder: "hh:mm"
	                });
					element.on("keyup", function(){
			            var searchValue = element.val();
						if (!element.inputmask("isComplete") && searchValue !== '')
							return;
			            triggerSearch(searchValue, 'time');
	                });
	                return element;
		    	},
	    	},
	    	boolean: {
	    		render: ({value, row, column, entity, additionalData}) => {
		    		return value == 'true' || value == '1'
		    			? '<i class="far fa-check-square fa-lg"><span style="visibility: hidden;">1</span></i>'
		    			: '<i class="far fa-square fa-lg"><span style="visibility: hidden;">0</span></i>';
	    		},
	    		search: ({column, title, savedFilter, searchTh, triggerSearch, additionalData}) => {
		    		var element = $(`<select data-type='boolean' style='width: 100% !important;' class='form-control input'>
					                    <option value='' selected>${STR_LANGUAGE.boolean_filter.all}</option>
					                    <option value='null'>${STR_LANGUAGE.boolean_filter.null}</option>
					                    <option value='checked'>${STR_LANGUAGE.boolean_filter.checked}</option>
					                    <option value='unchecked'>${STR_LANGUAGE.boolean_filter.unchecked}</option>
					                </select>`);
					element.change(function(){
			            var searchValue = element.val();
			            triggerSearch(searchValue, 'boolean');
	                });
	                return element;
		    	},
	    	},
	    	color: {
	    		render: ({value, row, column, entity, additionalData}) => {
	    			return '<i style="color:' + value + '" class="fa fa-lg fa-circle"></i>';
	    		}
	    	},
	    	status: {
	    		render: ({value, row, column, entity, additionalData}) => {
		            var keys = column.data.split(".");
		            var statusObj = diveObj(row, keys);
		            if (statusObj.f_name)
		                return '<span class="badge" style="background: ' + statusObj.f_color + ';">' + statusObj.f_name + '</span>';
		            else
		                return '<span class="badge">' + statusObj + '</span>';
	        	}
	    	},
	    	currency: {
	    		render: ({value, row, column, entity, additionalData}) => {
				    if (value === undefined || value === null)
				    	value = "";
				    else if (typeof value === 'string' && value.indexOf('.') != -1 && value.split('.')[1].length == 1)
				        value += '0';
				    else if(typeof value === 'number')
				        value = value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		    		return '<span data-type="currency">' + value + '</span>';
	    		},
	    		search: ({triggerSearch, title, savedFilter, ...rest}) => {
	        		var element = $(`<input type="text" class="form-control input" value="${savedFilter}" placeholder="${title}" />`);
	        		element.keyup(function() {
			            var searchValue = element.val();
			            triggerSearch(searchValue, 'currency');
	        		});
	        		return element;
		    	},
	    	},
	    	email: {
	    		render: ({value, row, column, entity, additionalData}) => {
					if (value == null || value == '')
						return value;
					return '<a href="mailto:' + value + '">' + value + '</a>';
				}
	    	},
	    	tel: {
	    		render: ({value, row, column, entity, additionalData}) => {
					if (value == null || value == '')
						return value;
		    		return '<a href="tel:' + value + '">' + value + '</a>';
	    		}
	    	},
	    	picture: {
	    		render: ({value, row, column, entity, additionalData}) => {
			        if (value != null && value.buffer != '')
			            return '<img class="file" style="max-width: 50px;" data-entity="' + entity + '" data-value="' + value.value + '" src=data:image/;base64,' + value.buffer + ' />';
			        return '';
		    	},
		    	binding: (data) => {
		    		defaults.columns.file.binding(data);
		    	},
	    	},
	    	file: {
	    		render: ({value, row, column, entity, additionalData}) => {
		            if(value != "" && value != null)
		                return '<a class="file" style="white-space: nowrap;" href="#" data-entity="' + entity + '" data-value="' + value + '" data-name="' + column.data + '"><i class="fa fa-download"></i>&nbsp;&nbsp;' + STR_LANGUAGE.download_file + '</a>';
		            return '';
	        	},
	        	binding: ({column, columnDef, entity, element, event, additionalData}) => {
			        if (typeof column === 'undefined')
			            return;
			        else if (column.type == 'file')
			        	element = $(element).find('a');
			        else if (column.type == 'picture')
			        	element = $(element).find('img');
			        if (!element.length)
			        	return;

			        const rowId = element.parents('tr').data('id');
			        const field = column.data;
			        const downloadParams = `entity=${entity}&field=${field}&id=${rowId}`;
			        $.ajax({
			            url: '/app/get_file?'+downloadParams,
			            type: 'GET',
			            success: function (result) {
			                let fileDisplay;
			                if(result.file.substring(result.file.length, result.file.length - 4).toLowerCase() == '.pdf') {
			                    var binaryPDF = generateFileViewer(result.data);
			                    fileDisplay = '<iframe src=/js/plugins/pdf/web/viewer.html?file=' + encodeURIComponent(binaryPDF) + ' style="width:100%;min-height:500px !important;" allowfullscreen webkitallowfullscreen ></iframe>';
			                }
			                else
			                	fileDisplay = '<p><img class="img-fluid" src=data:image/;base64,' + result.data + ' alt=' + result.file + '/></p>';
			                doModal(
			                	result.file,
			                	`${fileDisplay}<a href="/app/download?${downloadParams}" class="btn btn-primary"><i class="fa fa-download"></i>&nbsp;&nbsp;${STR_LANGUAGE.download_file}</a>
			                `);
			            },
			            error: console.error
			        });
		    	},
	    	},
	    	filename: {
	    		render: ({value, row, column, entity, additionalData}) => {
		            if(value != "" && value != null)
		                // Remove datatime + uuid (everything before the second _)
		                return value.substring(value.split('_', 2).join('_').length + 1);
					return '';
				}
	    	},
	    	url: {
	    		render: ({value, row, column, entity, additionalData}) => {
		    		if (value != null)
		            	return '<a target="_blank" href="'+value+'">'+value+'</a>';
		            return value;
	        	}
	    	},
	    	password: {
	    		render: ({value, row, column, entity, additionalData}) => {
	            	return '●●●●●●●●●';
	        	}
	    	},
	    	text: {
	    		render: ({value, row, column, entity, additionalData}) => {
			        if(value && value.length > 75){
			        	var decoded = HtmlDecode(value);
		                var shortText = $.parseHTML(decoded.slice(0, 75))[0].data ? $.parseHTML(decoded.slice(0, 75))[0].data : $(decoded).text().slice(0, 75);
		                shortText = HtmlEncode(shortText);
		                return "<span style='cursor: pointer;' class='np_text_modal'>" + shortText + "...<span class='full-text' style='display: none;'>" + value + "</span></span>";
		            }
		            return value;
	        	},
	        	binding: (data) => {
		    		const fullText = $(data.element).find('.full-text');
		    		if (fullText && fullText.length)
	    	        	doModal('Contenu', HtmlDecode($(data.element).find('.full-text').html()));
	    	        else
	    	        	defaults.bindings.default(data);
	    	    }
	    	},
    		show: {
    			render: ({value, row, column, entity, additionalData}) => {
					var aTag = `
						<a class="btn-show ajax" href="/${entity.substring(2)}/show?id=${row.id}" style="float: left;text-align: center;">
							<button class="btn btn-primary">
								<i class="fa fa-desktop fa-md"></i>
							</button>
						</a>`;
					return aTag;
				},
    			search: false,
    			binding: false,
    			orderable: false
    		},
    		update: {
    			render: ({value, row, column, entity, additionalData}) => {
					var aTag = `
					<a class="ajax" href="/${entity.substring(2)}/update_form?id=${row.id}" style="float: left;text-align: center;">
						<button class="btn btn-warning">
							<i class="fas fa-edit"></i>
						</button>
					</a>`;
					return aTag;
				},
    			search: false,
    			binding: false,
    			orderable: false,
    		},
    		delete: {
    			render: ({value, row, column, entity, additionalData}) => {
					var form = `
					<form class="ajax" action="/${entity.substring(2)}/delete" method="post" style="float: left;text-align: center;">
						<input name="id" type="hidden" value="${row.id}" />
						<button class="btn btn-danger btn-confirm">
							<i class="fas fa-trash"></i>
						</button>
					</form>`;
					return form;
				},
				binding: ({column, columnDef, entity, element, event, additionalData}) => {
		    		event.stopPropagation();event.preventDefault();
			        if (confirm(DEL_CONFIRM_TEXT))
						NodeaForms.handleSubmit($(element).find('form'), event, {
				    		handleSuccess: _ => {
				    			$(element).parents('table').data('table').ajax.reload(null, false)
				    		}
				    	});
		    	},
    			search: false,
    			orderable: false
			},
	    	default: {
	    		render: ({value}) => value,
	    		search: ({column, title, savedFilter, searchTh, triggerSearch, additionalData}) => {
	        		const element = $(`<input type="text" class="form-control input" value="${savedFilter}" placeholder="${title}" />`);
	        		element.keyup(function() {
			            const searchValue = element.val();
			            triggerSearch(searchValue);
	        		});
	        		return element;
		    	},
		    	binding: ({column, columnDef, entity, element, event, additionalData}) => {
		    		try {
						var td = $(element);
						if(!additionalData.scrolling)
							td.parents('tr').find('.btn-show')[0].click();
					} catch(err) {
						console.error("NodeaTable default binding failed - No `.btn-show` on row");
					}
		    	},
		    	orderable: true,
        		htmlencode: true
	    	}
	    },
	    buttons: [
            {
                text: STR_LANGUAGE.choose_columns,
                action: (event, datatable, button, config) => {
                	var tableID = button.parent().siblings('table').attr('id');
                    if ($("#columnSelector").length > 0)
                        button.next().remove();
                    else
                        button.after(generateColumnSelector('#'+tableID));
                }
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'Print',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'copyHtml5',
                text: '<i class="fas fa-file-code"></i>',
                titleAttr: 'Copy',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: '<i class="fas fa-sync-alt"></i>',
                titleAttr: STR_LANGUAGE.reset_filter,
                action: (event, datatable, button, config) => {
                	var tableID = button.parent().siblings('table').attr('id');
                    localStorage.setItem("nodea_filter_save_" + tableID.substring(1), null);
                    // TODO: reload only table
                    location.reload();
                }
            },
            {
                text: '<i class="fa fa-arrow-right"></i>',
                titleAttr: STR_LANGUAGE.scroll_right,
                action: (event, datatable, button, config) => {
                	var table = button.parent().siblings('table');
                    table.parents('.dataTables_wrapper').animate({scrollLeft: table.width()}, 800);
                }
            }
        ],
		dataTableOptions: {
	        serverSide: true,
	        responsive: false,
	        language: STR_LANGUAGE,
	        paging: true,
	        dom: 'RlBfrtip',
	        stateSave: true,
	        bLengthChange: true,
	        iDisplayLength: 25,
	        aLengthMenu: [[25, 50, 200, 500], [25, 50, 200, 500]],
	        bAutoWidth: false,
	        // Add row id to <tr> on row creation
	        fnCreatedRow: function( nRow, aData, iDataIndex ) {
	        	if (aData.id)
	        		$(nRow).attr('data-id', aData.id);
    		}
	    }
	}

	// params = {
	// 	// Regular dataTable options
	// 	dataTableOptions = {},
	//  // Nodea options
	//  columns = {},
	//  filters = {},
	//  bindings = {},
	//  buttons = {},
	// 	// Context of the table
	// 	context = document
	// }
	function initDataTable(tableID, params = {}, additionalData = {}) {
		if (!tableID)
			throw new Error("No tableID provided");

	    let table,
	    	context = params.context || document,
	    	columns = [],
	    	columnDefs = [],
	    	defaultOrder = {idx: -1, direction: 'DESC'},
	    	entity = tableID.split("#table_")[1];

	    // Adds a delay before filter execution. Saves it on execution
    	function executeFilter(colIdx, value = '', type = 'string') {
    		if (this.timeout)
    			clearTimeout(this.timeout);
			this.timeout = setTimeout(_ => {
	            defaults.saveFilterVal(tableID, columns[colIdx].data, value);
	            const search = value && value != "" ? JSON.stringify({type, value}) : "";
				table.columns(colIdx).search(search).draw();
			}, 300);
    	}

        // Fetch hidden columns from localStorage
	    let hiddenColumns;
	    try {
	    	hiddenColumns = JSON.parse(localStorage.getItem("nodea_hidden_columns_save_" + tableID.replace(/#/g, '')));
	    } catch(err){
	    	console.warn("Couldn't get localstorage hidden columns");
	    }
    	// Build each column
	    $(tableID + " .main th", context).each(function(idx) {
            let column = {
            	index: idx,
            	data: $(this).data('col') || null,
            	type: $(this).data('type'),
            	element: $(this),
            	hidden: $(this).attr("data-hidden") == "true",
            	defaultContent: " - "
            };
            let searchTh = $(tableID + " .filters th:eq("+ idx +")", context);

            for (const hideCol of params.hide || []) {
            	// Hidden using index
            	if (parseInt(hideCol) == idx
            	// Hidden using col name
            	|| column.data === hideCol
            	// Hidden using col type
            	|| column.type === hideCol)
            		column.hidden = true;
            }
		    // Check if column is hidden from columnSelector or through `data-hidden="true"` setting. data-hidden forces column hide
		    column.show = column.hidden === true
		    	? false
		    	: !hiddenColumns || !hiddenColumns.includes(column.data)

            var columnDef = {
        		targets: idx,
        		visible: false,
        		orderable: false
        	};

            if (column.show === true) {
            	columnDef = {
					targets: idx,
					visible: true,
					orderable: false,
					...defaults.columns.default,
					...defaults.columns[column.type],
					...(params.columns ? params.columns.default : {}),
					...(params.columns ? params.columns[column.type] : {})
				}

				// Needed to be done after destructuring in order to have columnDef.search key in columnDef obj
				columnDef.searchable = !!columnDef.search;

	        	// COLUMN RENDER
                const originalRender = columnDef.render;
            	columnDef.render = (data, type, row, meta) => {
            		let value = "", fieldPath = columns[meta.col].data;
	                // Associated field. Go down object to find the right value
	                if (fieldPath) {
		                if (fieldPath.indexOf('.') != -1) {
		                    const keys = fieldPath.split(".");
		                    value = diveObj(row, keys);
		                    if(typeof value === 'object')
		                        value = value[keys.slice(-1)[0]];
		                }
		                // Regular value
		                else
		                    value = row[fieldPath];
		            }
	                if(columnDef.htmlencode === true && value && value != '' && isNaN(value))
	                    value = HtmlEncode(value);

	                return originalRender({value, row, column, entity, additionalData});
            	}

	            // COLUMN FILTER
	            if (searchTh.length && columnDef.search) {
	            	var savedFilter = defaults.getFilterVal(tableID, searchTh.data('field'));
	            	var title = searchTh.text();
	            	const searchElement = columnDef.search({
	            		column, savedFilter, searchTh, title, additionalData,
	            		triggerSearch: (value, type) =>  executeFilter(idx, value, type)
	            	});
	            	searchTh.html('').append(searchElement);
	            }
            }
            else
            	searchTh.hide();

            // Look for default order on field. Presence of `data-default-order` gives the index, value gives direction.
            // Ex: <th data-default-order="ASC" data-col="id">
            if (column.element.data('default-order') || (defaultOrder.idx === -1 && columnDef.orderable === true)) {
                defaultOrder.idx = column.index;
                defaultOrder.direction = column.element.data('default-order') || 'DESC';
            }

        	columns.push(column);
            columnDefs.push(columnDef);
	    });

    	// TODO:
    	// problem with filters on boolean column ("Tout" doesn't work, problem serverside)
    	// Remove data-field from generated code, check for its usage elsewhere

		try {
			// Table initialization
			var tableOptions = {
				// Variable defaults
				ajax: {
		            "url": $(tableID, context).data('url'),
		            "type": "POST",
		            data: function(e) {
		                // Used for global search
		                e.columnsTypes = columns.map(col => col.type || 'string');
		                return e;
		            }
		        },
    	        stateSaveCallback: (...params) => defaults.stateSaveCallback(tableID, ...params),
		        stateLoadCallback: (...params) => defaults.stateLoadCallback(tableID, ...params),
				order: [ defaultOrder.idx, defaultOrder.direction ],
		        // Static defaults
				...defaults.dataTableOptions,
				// Override defaults with params
				...params.dataTableOptions,
				buttons: params.dataTableOptions && params.dataTableOptions.buttons ? params.dataTableOptions.buttons : defaults.buttons,
				// Nodea specifics
				columns,
				columnDefs
			};
			table = $(tableID, context).DataTable(tableOptions);
			$(tableID, context).show();

			// Make data available on jquery table element
			table.tableOptions = tableOptions;
		    $(tableID, context).data('table', table);

			var x,left = 0,down;
			/* If we are scrolling horizontaly the datalist then don't trigger the click event */
			additionalData.scrolling = false;

			// Bindings - Table cell click
			$(tableID + ' tbody', context).on('click', 'td', function (event) {
				if (table.data().length == 0)
					return;

				var columnIndex = $(this).parents('tr').find('td').index($(this));
				var column = columns[columnIndex],
					columnDef = columnDefs[columnIndex];

				if (columnDef.binding === false)
					return true;

				columnDef.binding({
					column,
					columnDef,
					entity,
					element: this,
					event,
					additionalData
				});
			});

			$(tableID + ' tbody', context).mousedown(function (e) {
				if (!e.ctrlKey) {
					e.preventDefault();
					down = true;
					x = e.pageX;
					left = $(".dataTables_wrapper", context).scrollLeft();
				}
			});
			$(tableID + ' tbody', context).mousemove(function (e) {
				if (down) {
					additionalData.scrolling = true;
					var newX = e.pageX;
					$(".dataTables_wrapper", context).scrollLeft(left - newX + x);
				}
			});
			$(tableID + ' tbody', context).mouseup(function(e){down=false;setTimeout(function(){additionalData.scrolling = false;}, 500);});
			$(tableID + ' tbody', context).mouseleave(function(e){down=false;setTimeout(function(){additionalData.scrolling = false;}, 500);});

		} catch(err) {
			console.error("ERROR: NodeaTable "+tableID+" :");
			console.error(err);
		}
		return table;
	}

	initDataTable.defaults = defaults;

	return initDataTable;
})();