const bot_helper = require('../helpers/bot');

// ******* BASIC ******* //
exports.showSession = _ => {
	const data = {};
	data.function = "showSession";
	return data;
};

exports.help = _ => {
	const data = {};
	data.function = "help";
	return data;
};

exports.deploy = result => {
	const data = {
		branch: 'master'
	};
	data.function = "deploy";
	// Specific deploy branch
	if(typeof result[1] !== "undefined")
		data.branch = result[1].trim();
	return data;
};

exports.restart = _ => {
	const data = {};
	data.function = "restart";
	return data;
};

exports.installNodePackage = result => {
	const data = {
		specificModule: null
	};

	// Specific module
	if(typeof result[1] !== "undefined")
		data.specificModule = result[1].trim();

	data.function = "installNodePackage";
	return data;
};

exports.gitPush = _ => {
	const data = {};
	data.function = "gitPush";
	return data;
};

exports.gitPull = _ => {
	const data = {};
	data.function = "gitPull";
	return data;
};

exports.gitCommit = _ => {
	const data = {};
	data.function = "gitCommit";
	return data;
};

exports.gitStatus = _ => {
	const data = {};
	data.function = "gitStatus";
	return data;
};

// ******* SELECT ******* //
exports.selectApplication = result => {

	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	const data = {
		function: "selectApplication",
		options: options
	};
	return data;
};

exports.selectModule = result => {

	const value = result[1];
	const options = {
		value: value.trim(),
		processValue: true
	};

	const data = {
		function: "selectModule",
		options: options
	};
	return data;
};

exports.selectEntity = result => {

	const value = result[1];
	const options = {
		value: value.trim(),
		processValue: true
	};

	const data = {
		function: "selectEntity",
		options: options
	};
	return data;
};

// ******* FIELD ATTRIBUTES ******* //
exports.setFieldAttribute = result => {

	// Set entity name as the first option in options array
	const options = {
		value: result[1],
		word: result[2],
		attributeValue: result[3],
		processValue: true
	};

	const data = {
		function: "setFieldAttribute",
		options: options
	};
	return data;
};

exports.setFieldKnownAttribute = result => {

	// Set entity name as the first option in options array
	const options = {
		value: result[1],
		word: result[2],
		processValue: true
	};

	const data = {
		function: "setFieldKnownAttribute",
		options: options
	};
	return data;
};

// ******* DATALIST ******* //
exports.setColumnVisibility = result => {

	// Set entity name as the first option in options array
	const options = {
		value: result[1],
		word: result[2],
		processValue: true
	};

	const data = {
		function: "setColumnVisibility",
		options: options
	};
	return data;
};

exports.setColumnHidden = result => {

	// Set entity name as the first option in options array
	const options = {
		value: result[1],
		word: "hidden",
		processValue: true
	};

	const data = {
		function: "setColumnVisibility",
		options: options
	};
	return data;
};

exports.setColumnVisible = result => {

	// Set entity name as the first option in options array
	const options = {
		value: result[1],
		word: "visible",
		processValue: true
	};

	const data = {
		function: "setColumnVisibility",
		options: options
	};
	return data;
};

// ******* CREATE ******* //
exports.createNewApplication = result => {

	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewApplication", options, value);
};

exports.createNewModule = result => {

	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewModule", options, value);
};

exports.createNewEntity = result => {

	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewEntity", options, value);
};

exports.createNewParamEntity = result => {

	const value = result[1];
	const options = {
		value: value,
		isParamEntity: true,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewEntity", options, value);
};

exports.createNewField = result => {

	// Field name has not been defined
	const value = result[1];
	let defaultValue = null;

	// Default value ?
	if (typeof result[2] !== "undefined")
		defaultValue = result[2];

	const options = {
		value: value,
		defaultValue: defaultValue,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewField", options, value);
};

exports.createNewFieldWithType = result => {

	const value = result[1];
	const type = result[2].toLowerCase().trim();

	// Default value
	let defaultValue = null;
	if (typeof result[3] !== "undefined")
		defaultValue = result[3];

	// Preparing Options
	const options = {
		value: value,
		givenType: type,
		type: bot_helper.matchNodeaType(type),
		defaultValue: defaultValue,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewField", options, value);
};

exports.createNewFieldWithTypeEnum = result => {

	const value = result[1];
	const allValues = result[2];

	// Default value
	let defaultValue = null;
	if (typeof result[3] !== "undefined")
		defaultValue = result[3];

	const options = {
		value: value,
		type: "enum",
		allValues: allValues,
		defaultValue: defaultValue,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewField", options, value);
};

exports.createNewFieldWithTypeRadio = result => {

	const value = result[1];
	const allValues = result[2];
	let defaultValue = null;

	// Default value ?
	if (typeof result[3] !== "undefined")
		defaultValue = result[3];

	const options = {
		value: value,
		type: "radio",
		allValues: allValues,
		defaultValue: defaultValue,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewField", options, value);
};

// ******* DELETE ******* //

exports.deleteApplication = result => {

	const value = result[1];

	const options = {
		value: value,
		processValue: true
	};

	const data = {
		function: "deleteApplication",
		options: options
	};
	return data;
};

exports.deleteModule = result => {

	const value = result[1];

	const options = {
		value: value,
		processValue: true
	};

	const data = {
		function: "deleteModule",
		options: options
	};
	return data;
};

exports.deleteEntity = result => {

	const value = result[1];

	const options = {
		value: value,
		processValue: true
	};

	const data = {
		function: "deleteEntity",
		options: options
	};
	return data;
};

exports.deleteField = result => {

	const value = result[1];

	const options = {
		value: value,
		processValue: true
	};

	const data = {
		function: "deleteField",
		options: options
	};
	return data;
};

exports.deleteTab = result => {

	const value = result[1];

	const options = {
		value: value,
		processValue: true
	};

	const data = {
		function: "deleteTab",
		options: options
	};
	return data;
};

// ******* LIST ******* //
exports.listApplication = _ => {

	const data = {
		function: "listApplication"
	};
	return data;
};

exports.listModule = _ => {

	const data = {
		function: "listModule"
	};
	return data;
};

exports.listEntity = _ => {

	const data = {
		function: "listEntity"
	};
	return data;
};

exports.listField = _ => {

	const data = {
		function: "listField"
	};
	return data;
};

// ******* ASSOCIATION ******* //

// --------- One to One ---------
// Tabs in show
exports.relationshipHasOne = result => {

	const source = result[1];
	const target = result[2];

	const options = {
		target: target,
		source: source,
		foreignKey: "id_" + target.toLowerCase(),
		as: target,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewHasOne", options, target);
};

exports.relationshipHasOneWithName = result => {

	const source = result[1];
	const target = result[2];
	const as = result[3];

	const options = {
		target: target,
		source: source,
		foreignKey: "id_" + target.toLowerCase() + "_" + as.toLowerCase(),
		as: as,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewHasOne", options, as);
};


// --------- Field in create / update / show ---------
exports.createFieldRelatedTo = result => {

	const as = result[1];
	const target = result[2];

	const options = {
		target: target,
		foreignKey: "id_" + target.toLowerCase() + "_" + as.toLowerCase(),
		as: as,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewFieldRelatedTo", options, as);
};

exports.createFieldRelatedToUsing = result => {

	const as = result[1];
	const target = result[2];
	const usingField = result[3];

	const options = {
		target: target,
		foreignKey: "id_" + target.toLowerCase() + "_" + as.toLowerCase(),
		as: as,
		usingField: usingField,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewFieldRelatedTo", options, as);
};

exports.createFieldRelatedToMultiple = result => {

	const as = result[1];
	const target = result[2];

	// Preparing Options
	const options = {
		target: target,
		as: as,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewFieldRelatedToMultiple", options, as);
};

exports.createFieldRelatedToMultipleUsing = result => {

	const as = result[1];
	const target = result[2];
	const usingField = result[3];

	const options = {
		target: target,
		as: as,
		usingField: usingField,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewFieldRelatedToMultiple", options, as);
};

exports.createFieldRelatedToMultipleCheckbox = result => {

	const as = result[1];
	const target = result[2];

	// Preparing Options
	const options = {
		target: target,
		isCheckbox: true,
		as: as,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewFieldRelatedToMultiple", options, as);
};

exports.createFieldRelatedToMultipleCheckboxUsing = result => {

	const as = result[1];
	const target = result[2];
	const usingField = result[3];

	const options = {
		target: target,
		as: as,
		usingField: usingField,
		isCheckbox: true,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewFieldRelatedToMultiple", options, as);
};

// --------- One to Many ---------
// Tabs in show
exports.relationshipHasMany = result => {

	const source = result[1];
	const target = result[2];

	const options = {
		target: target,
		source: source,
		foreignKey: "id_" + source.toLowerCase(),
		as: target,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewHasMany", options, target);
};

exports.relationshipHasManyWithName = result => {

	const source = result[1];
	const target = result[2];
	const as = result[3];

	const options = {
		target: target,
		source: source,
		foreignKey: "id_" + source.toLowerCase() + "_" + as.toLowerCase(),
		as: as,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewHasMany", options, as);
};

exports.relationshipHasManyPreset = result => {
	const source = result[1];
	const target = result[2];
	let as = target;
	let foreignKey = "id_" + source.toLowerCase();

	if (typeof result[3] !== "undefined")
		as = result[3];
	foreignKey = "id_" + source.toLowerCase() + "_" + as.toLowerCase()

	const options = {
		target: target,
		source: source,
		foreignKey: foreignKey,
		as: as,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewHasManyPreset", options, target);
};

exports.relationshipHasManyPresetUsing = result => {
	const source = result[1];
	const target = result[2];
	const usingField = result[3];
	let as = target;
	let foreignKey = "id_" + source.toLowerCase();

	if (typeof result[4] !== "undefined")
		as = result[4];
	foreignKey = "id_" + source.toLowerCase() + "_" + as.toLowerCase()

	const options = {
		target: target,
		source: source,
		foreignKey: foreignKey,
		as: as,
		usingField: usingField,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewHasManyPreset", options, target);
};

// ******* COMPONENT ******* //

/* STATUS */
exports.createNewComponentStatus = result => {
	const defaultValue = result[0].indexOf("component") != -1 ? "Status" : "Statut";
	return {
		function: "createNewComponentStatus",
		options: {value: defaultValue, processValue: true}
	};
}

exports.createNewComponentStatusWithName = result => {
	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewComponentStatus", options, value);
}

exports.deleteComponentStatus = _ => {
	const data = {
		function: "deleteComponentStatus",
		options: {}
	};
	return data;
};

exports.deleteComponentStatusWithName = result => {
	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("deleteComponentStatus", options, value);
};

/* FILE STORAGE */
exports.addComponentFileStorage = _ => {
	const data = {
		function: "addComponentFileStorage",
		options: {}
	};
	return data;
};

exports.addComponentFileStorageWithName = result => {
	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("addComponentFileStorage", options, value);
};

/* AGENDA */
exports.createNewComponentAgenda = _ => {
	const data = {
		function: "createNewComponentAgenda",
		options: {}
	};
	return data;
};

exports.createNewComponentAgendaWithName = result => {
	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("createNewComponentAgenda", options, value);
};

exports.deleteAgenda = _ => {
	const data = {
		function: "deleteAgenda",
		options: {}
	};
	return data;
};

exports.deleteAgendaWithName = result => {
	const value = result[1];
	const options = {
		value: value,
		processValue: true
	};

	return bot_helper.checkAndCreateAttr("deleteAgenda", options, value);
};

/**
 * Component Address
 * @param {type} result of bot analyzer (this.parse)
 * @returns {function name and user instruction}
 */
exports.createNewComponentAddress = result => {
	const options = {
		componentName: "Address",
		instruction: result[0]
	};
	return bot_helper.checkAndCreateAttr("createNewComponentAddress", options, "Address");
};

/**
 * Component Address
 * @param {type} result of bot analyzer (this.parse)
 * @returns {function name and user instruction}
 */
exports.createNewComponentAddressWithName = result => {
	const options = {
		componentName: result[1],
		value: result[1],
		processValue: true,
		instruction: result[0]
	};
	return bot_helper.checkAndCreateAttr("createNewComponentAddress", options, result[1]);
};

/**
 * Delete component address
 */
exports.deleteComponentAddress = result => {
	return {
		function: "deleteComponentAddress",
		options: result
	};
};

/**
 * create component DocumentTemplate
 */
exports.createComponentDocumentTemplate = result => {
	return {
		function: "createComponentDocumentTemplate",
		options: result
	};
};

exports.createComponentDocumentTemplateWithName = result => {
	const options = {
		instruction: result[0],
		showValue: result[1]
	};
	return bot_helper.checkAndCreateAttr("createComponentDocumentTemplate", options, result[1]);
};
/**
 * Delete component DocumentTemplate
 */
exports.deleteComponentDocumentTemplate = result => {
	return {
		function: "deleteComponentDocumentTemplate",
		options: result
	};
};

/* CHAT */
exports.createComponentChat = _ => {
	return {
		function: "createComponentChat"
	}
}

// ******* INTERFACE ******* //
exports.setLogo = result => {
	const value = result[1];
	const options = {
		value: value
	};

	const data = {
		function: "setLogo",
		options: options
	};
	return data;
};

exports.removeLogo = _ => {
	const data = {};
	data.function = "removeLogo";
	return data;
};

exports.setLayout = result => {

	const value = result[1];
	const options = {
		value: value
	};

	const data = {
		function: "setLayout",
		options: options
	};
	return data;
};

exports.listLayout = _ => {
	return {
		function: "listLayout"
	};
};

exports.setTheme = result => {
	const value = result[1];
	const options = {
		value: value
	};

	const data = {
		function: "setTheme",
		options: options
	};
	return data;
};

exports.listTheme = _ => {
	return {
		function: "listTheme"
	};
};

exports.listIcon = _ => {
	return {
		function: 'listIcon'
	};
}

exports.setIcon = result => {
	const data = {
		function: "setIcon",
		iconValue: result[1],
		options: {
			value: result[2],
			processValue: true
		}
	};
	return data;
}

function getRightWidgetType(originalType) {
	switch (originalType) {
		case "bo??te d'information":
		case "info box":
		case "info":
		case "information":
			return "info";

		case "bo??te de statistiques":
		case "stats box":
		case "stats":
		case "stat":
		case "statistique":
			return "stats";

		default:
			return -1;
	}
}

function buildDataForPiechart(result) {
	const data = {
		function: 'createWidgetPiechart',
		widgetType: 'piechart',
		widgetInputType: 'Piechart'
	}
	// Current entity as target
	if (result.length == 2)
		data.givenField = result[1];
	// Defined target entity
	else if (result.length == 3) {
		data.entityTarget = result[1].trim();
		data.givenField = result[2].trim();
	}

	return data;
}

exports.createWidgetPiechart = result => {
	const data = buildDataForPiechart(result);
	data.legend = true;

	return data;
}

exports.createWidgetPiechartWithoutLegend = result => {
	const data = buildDataForPiechart(result);
	data.legend = false;

	return data;
}

exports.createWidgetLastRecordsWithLimit = result => {
	const data = {
		function: 'createWidgetLastRecords',
		widgetType: 'lastrecords',
		widgetInputType: 'last records'
	}
	// Current entity as target
	if (result.length == 3) {
		data.limit = result[1];
		data.columns = result[2].split(',');
	}
	// Defined target entity
	else if (result.length == 4) {
		data.entityTarget = result[1];
		data.limit = result[2];
		data.columns = result[3].split(',');
	}

	// Remove unwanted spaces from columns
	for (let i = 0; i < data.columns.length; i++)
		data.columns[i] = data.columns[i].trim();

	return data;
}

exports.createWidgetLastRecords = result => {
	const data = {
		function: 'createWidgetLastRecords',
		widgetType: 'lastrecords',
		widgetInputType: 'last records',
		limit: 10
	}

	// Current entity as target
	if (result.length == 2)
		data.columns = result[1].split(',');
	// Defined target entity
	else if (result.length == 3) {
		data.entityTarget = result[1];
		data.columns = result[2].split(',');
	}

	// Remove unwanted spaces from columns
	for (let i = 0; i < data.columns.length; i++)
		data.columns[i] = data.columns[i].trim();

	return data;
}

exports.createWidgetOnEntity = result => {
	const originalType = result[1];
	const finalType = getRightWidgetType(originalType);

	if (finalType == -1)
		throw new Error('error.missingParametersInstruction');

	return {
		function: 'createWidgetOnEntity',
		widgetInputType: originalType,
		widgetType: finalType,
		entityTarget: result[2]
	}
}

exports.createWidget = result => {
	const originalType = result[1];
	const finalType = getRightWidgetType(originalType);

	if (finalType == -1)
		throw new Error('error.missingParametersInstruction');

	return {
		function: 'createWidget',
		widgetInputType: originalType,
		widgetType: finalType
	}
}

exports.deleteWidget = result => {
	return {
		function: 'deleteWidget',
		widgetTypes: [result[1] == 'piechart' ? 'piechart' : getRightWidgetType(result[1])],
		widgetInputType: result[1]
	}
}

exports.deleteEntityWidgets = result => {
	return {
		function: 'deleteEntityWidgets',
		entityTarget: result[1]
	}
}

exports.addTitle = result => {
	const value = result[1];
	let afterField = null;
	if (typeof result[2] !== "undefined")
		afterField = result[2];
	return {
		function: "addTitle",
		options: {
			value: value,
			afterField: afterField
		}
	};
}

exports.removeTitle = result => {
	const value = result[1];
	return {
		function: "removeTitle",
		options: {
			value: value
		}
	};
}

const bot_instructions = {
	"help": [
		"how could you assist me",
		"help",
		"?? l'aide",
		"aidez-moi",
		"aide",
		"au secours"
	],
	"deploy": [
		"deploy",
		"d??ployer",
		"d??ploiement",
		"deploy (.*)",
		"d??ployer (.*)",
		"d??ploiement (.*)"
	],
	"restart": [
		"restart server",
		"restart",
		"red??marrer",
		"red??marrer serveur",
		"red??marrer le serveur"
	],
	"installNodePackage": [
		"npm install",
		"npm install (.*)",
		"installer les modules node",
		"installer le module node (.*)",
		"install node package"
	],
	"gitPush": [
		"save",
		"save on git",
		"push",
		"push on git",
		"save the application",
		"sauvegarder",
		"sauvegarder l'application",
		"sauvegarder application",
		"git push"
	],
	"gitPull": [
		"load",
		"reload",
		"pull",
		"git pull",
		"fetch",
		"recharger"
	],
	"gitCommit": [
		"commit",
		"git commit"
	],
	"gitStatus": [
		"git status"
	],
	"selectApplication": [
		"select application (.*)",
		"select the application (.*)",
		"use application (.*)",
		"use the application (.*)",
		"s??lectionner l'application (.*)",
		"s??lectionner application (.*)"
	],
	"selectModule": [
		"select module (.*)",
		"select the module (.*)",
		"use module (.*)",
		"use the module (.*)",
		"s??lectionner le module (.*)",
		"s??lectionner module (.*)"
	],
	"selectEntity": [
		"select entity (.*)",
		"select data entity (.*)",
		"use entity (.*)",
		"use data entity (.*)",
		"s??lectionner l'entit?? (.*)",
		"s??lectionner entit?? (.*)"
	],
	"setFieldKnownAttribute": [
		"set field (.*) (.*)",
		"set the field (.*) (.*)",
		"mettre champ (.*) (.*)",
		"mettre le champ (.*) (.*)",
		"mettre le champ (.*) en (.*)",
		"rendre champ (.*) (.*)",
		"rendre le champ (.*) (.*)"
	],
	"setFieldAttribute": [
		"set field (.*) attribute (.*) (.*)",
		"set field (.*) with attribute (.*) (.*)",
		"set the field (.*) with attribute (.*) (.*)",
		"set field (.*) attribute (.*) = (.*)",
		"set field (.*) with attribute (.*) = (.*)",
		"set the field (.*) with attribute (.*) = (.*)",
		"set field (.*) attribute (.*)=(.*)",
		"set field (.*) with attribute (.*)=(.*)",
		"set the field (.*) with attribute (.*)=(.*)",
		"mettre le champ (.*) avec l'attribut (.*) (.*)",
		"ajouter sur le champ (.*) l'attribut (.*) (.*)",
		"mettre le champ (.*) avec l'attribut (.*) = (.*)",
		"ajouter sur le champ (.*) l'attribut (.*) = (.*)",
		"mettre le champ (.*) avec l'attribut (.*)=(.*)",
		"ajouter sur le champ (.*) l'attribut (.*)=(.*)"
	],
	"setColumnVisibility": [
		"set column (.*) (.*)",
		"mettre la colonne (.*) en (.*)",
		"rendre la colonne (.*) (.*)"
	],
	"setColumnHidden": [
		"hide column (.*)",
		"hide the column (.*)",
		"cacher la colonne (.*)",
		"cacher colonne (.*)"
	],
	"setColumnVisible": [
		"show column (.*)",
		"show the column (.*)",
		"afficher la colonne (.*)",
		"afficher colonne (.*)"
	],
	"createNewApplication": [
		"create application (.*)",
		"add application (.*)",
		"cr??er application (.*)",
		"cr??er une application (.*)",
		"ajouter application (.*)",
		"ajouter l'application (.*)",
		"ajouter une application (.*)"
	],
	"createNewModule": [
		"create module (.*)",
		"add module (.*)",
		"cr??er module (.*)",
		"cr??er un module (.*)",
		"cr??er le module (.*)",
		"ajouter module (.*)",
		"ajouter un module (.*)",
		"ajouter le module (.*)"
	],
	"createNewEntity": [
		"create entity (.*)",
		"create data entity (.*)",
		"add entity (.*)",
		"add data entity (.*)",
		"cr??er entit?? (.*)",
		"cr??er une entit?? (.*)",
		"cr??er l'entit?? (.*)",
		"ajouter entit?? (.*)",
		"ajouter une entit?? (.*)",
		"ajouter l'entit?? (.*)"
	],
	"createNewParamEntity": [
		"create param entity (.*)",
		"add param entity (.*)",
		"cr??er entit?? de param??tre (.*)",
		"cr??er une entit?? de param??tre (.*)",
		"cr??er l'entit?? de param??tre (.*)",
		"ajouter entit?? de param??tre (.*)",
		"ajouter une entit?? de param??tre (.*)",
		"ajouter l'entit?? de param??tre (.*)"
	],
	"createNewFieldWithTypeEnum": [
		"create field (.*) with type enum and values (.*)",
		"add field (.*) with type enum and values (.*)",
		"create field (.*) with type enum with values (.*)",
		"add field (.*) with type enum with values (.*)",
		"cr??er champ (.*) de type enum avec les valeurs (.*)",
		"cr??er un champ (.*) de type enum avec les valeurs (.*)",
		"ajouter champ (.*) de type enum avec les valeurs (.*)",
		"ajouter un champ (.*) de type enum avec les valeurs (.*)",
		"ajouter le champ (.*) de type enum avec les valeurs (.*)",
		"create field (.*) with type enum and values (.*) and default value (.*)",
		"add field (.*) with type enum and values (.*) and default value (.*)",
		"create field (.*) with type enum with values (.*) and default value (.*)",
		"add field (.*) with type enum with values (.*) and default value (.*)",
		"create field (.*) with type enum and values (.*) with default value (.*)",
		"add field (.*) with type enum and values (.*) with default value (.*)",
		"cr??er champ (.*) de type enum avec les valeurs (.*) et la valeur par d??faut (.*)",
		"cr??er un champ (.*) de type enum avec les valeurs (.*) et la valeur par d??faut (.*)",
		"cr??er le champ (.*) de type enum avec les valeurs (.*) et la valeur par d??faut (.*)",
		"ajouter champ (.*) de type enum avec les valeurs (.*) et la valeur par d??faut (.*)",
		"ajouter un champ (.*) de type enum avec les valeurs (.*) et la valeur par d??faut (.*)",
		"ajouter le champ (.*) de type enum avec les valeurs (.*) et la valeur par d??faut (.*)"
	],
	"createNewFieldWithTypeRadio": [
		"create field (.*) with type radio and values (.*)",
		"add field (.*) with type radio and values (.*)",
		"create field (.*) with type radio with values (.*)",
		"add field (.*) with type radio with values (.*)",
		"cr??er champ (.*) de type radio avec les valeurs (.*)",
		"cr??er un champ (.*) de type radio avec les valeurs (.*)",
		"cr??er le champ (.*) de type radio avec les valeurs (.*)",
		"ajouter champ (.*) de type radio avec les valeurs (.*)",
		"ajouter un champ (.*) de type radio avec les valeurs (.*)",
		"ajouter le champ (.*) de type radio avec les valeurs (.*)",
		"create field (.*) with type radio with values (.*) and default value (.*)",
		"add field (.*) with type radio with values (.*) and default value (.*)",
		"create field (.*) with type radio and values (.*) with default value (.*)",
		"add field (.*) with type radio and values (.*) with default value (.*)",
		"create field (.*) with type radio and values (.*) and default value (.*)",
		"add field (.*) with type radio and values (.*) and default value (.*)",
		"cr??er champ (.*) de type radio avec les valeurs (.*) et la valeur par d??faut (.*)",
		"cr??er un champ (.*) de type radio avec les valeurs (.*) et la valeur par d??faut (.*)",
		"cr??er le champ (.*) de type radio avec les valeurs (.*) et la valeur par d??faut (.*)",
		"ajouter champ (.*) de type radio avec les valeurs (.*) et la valeur par d??faut (.*)",
		"ajouter un champ (.*) de type radio avec les valeurs (.*) et la valeur par d??faut (.*)",
		"ajouter le champ (.*) de type radio avec les valeurs (.*) et la valeur par d??faut (.*)"
	],
	"createNewFieldWithType": [
		"create field (.*) with type (.*)",
		"add field (.*) with type (.*)",
		"cr??er champ (.*) de type (.*)",
		"cr??er un champ (.*) de type (.*)",
		"ajouter champ (.*) de type (.*)",
		"ajouter un champ (.*) de type (.*)",
		"ajouter le champ (.*) de type (.*)",
		"create field (.*) with type (.*) and default value (.*)",
		"add field (.*) with type (.*) and default value (.*)",
		"cr??er champ (.*) de type (.*) avec la valeur par d??faut (.*)",
		"cr??er un champ (.*) de type (.*) avec la valeur par d??faut (.*)",
		"cr??er le champ (.*) de type (.*) avec la valeur par d??faut (.*)",
		"ajouter champ (.*) de type (.*) avec la valeur par d??faut (.*)",
		"ajouter un champ (.*) de type (.*) avec la valeur par d??faut (.*)",
		"ajouter le champ (.*) de type (.*) avec la valeur par d??faut (.*)"
	],
	"createNewField": [
		"create field (.*)",
		"add field (.*)",
		"cr??er champ (.*)",
		"cr??er un champ (.*)",
		"cr??er le champ (.*)",
		"ajouter champ (.*)",
		"ajouter un champ (.*)",
		"ajouter le champ (.*)",
		"create field (.*) and default value (.*)",
		"add field (.*) and default value (.*)",
		"create field (.*) with default value (.*)",
		"add field (.*) with default value (.*)",
		"cr??er champ (.*) avec la valeur par d??faut (.*)",
		"cr??er un champ (.*) avec la valeur par d??faut (.*)",
		"cr??er le champ (.*) avec la valeur par d??faut (.*)",
		"ajouter champ (.*) avec la valeur par d??faut (.*)",
		"ajouter un champ (.*) avec la valeur par d??faut (.*)",
		"ajouter le champ (.*) avec la valeur par d??faut (.*)"
	],
	"deleteApplication": [
		"delete application (.*)",
		"drop application (.*)",
		"remove application (.*)",
		"supprimer application (.*)",
		"supprimer l'application (.*)"
	],
	"deleteModule": [
		"delete module (.*)",
		"drop module (.*)",
		"remove module (.*)",
		"supprimer module (.*)",
		"supprimer le module (.*)"
	],
	"deleteEntity": [
		"delete entity (.*)",
		"drop entity (.*)",
		"remove entity (.*)",
		"delete data entity (.*)",
		"drop data entity (.*)",
		"remove data entity (.*)",
		"supprimer entit?? (.*)",
		"supprimer l'entit?? (.*)"
	],
	"deleteField": [
		"delete field (.*)",
		"drop field (.*)",
		"remove field (.*)",
		"supprimer champ (.*)",
		"supprimer le champ (.*)"
	],
	"deleteTab": [
		"delete tab (.*)",
		"drop tab (.*)",
		"remove tab (.*)",
		"supprimer onglet (.*)",
		"supprimer l'onglet (.*)"
	],
	"listModule": [
		"list module",
		"list modules",
		"lister module",
		"lister modules",
		"lister les modules"
	],
	"listEntity": [
		"list data entity",
		"list data entities",
		"list entity",
		"list entities",
		"lister entit??",
		"lister entit??s",
		"lister les entit??s"
	],
	"listField": [
		"list field",
		"list fields",
		"lister champ",
		"lister champs",
		"lister les champs"
	],
	"relationshipHasOne": [
		"entity (.*) has one (.*)",
		"entit?? (.*) poss??de un (.*)",
		"entit?? (.*) poss??de une (.*)",
		"entit?? (.*) poss??de (.*)",
		"entit?? (.*) a un (.*)",
		"entit?? (.*) a une (.*)",
		"entit?? (.*) a (.*)"
	],
	"relationshipHasOneWithName": [
		"entity (.*) has one (.*) called (.*)",
		"entity (.*) has one (.*) with name (.*)",
		"entit?? (.*) poss??de un (.*) appel?? (.*)",
		"entit?? (.*) poss??de une (.*) appel??e (.*)",
		"entit?? (.*) poss??de (.*) appel?? (.*)",
		"entit?? (.*) poss??de (.*) appel??e (.*)",
		"entit?? (.*) a un (.*) appel?? (.*)",
		"entit?? (.*) a une (.*) appel??e (.*)",
		"entit?? (.*) a (.*) appel?? (.*)",
		"entit?? (.*) a (.*) appel??e (.*)"
	],
	"createFieldRelatedTo": [
		"create field (.*) related to (.*)",
		"add field (.*) related to (.*)",
		"cr??er un champ (.*) reli?? ?? (.*)",
		"ajouter un champ (.*) reli?? ?? (.*)",
		"cr??er champ (.*) reli?? ?? (.*)",
		"ajouter champ (.*) reli?? ?? (.*)"
	],
	"createFieldRelatedToUsing": [
		"create field (.*) related to (.*) using (.*)",
		"add field (.*) related to (.*) using (.*)",
		"cr??er un champ (.*) reli?? ?? (.*) en utilisant (.*)",
		"cr??er champ (.*) reli?? ?? (.*) en utilisant (.*)",
		"cr??er un champ (.*) reli?? ?? (.*) en affichant (.*)",
		"cr??er champ (.*) reli?? ?? (.*) en affichant (.*)",
		"ajouter un champ (.*) reli?? ?? (.*) en utilisant (.*)",
		"ajouter un champ (.*) reli?? ?? (.*) en affichant (.*)",
		"ajouter champ (.*) reli?? ?? (.*) en utilisant (.*)",
		"ajouter champ (.*) reli?? ?? (.*) en affichant (.*)",
		"ajouter le champ (.*) reli?? ?? (.*) en affichant (.*)",
		"ajouter le champ (.*) reli?? ?? (.*) en utilisant (.*)"
	],
	"relationshipHasMany": [
		"entity (.*) has many (.*)",
		"entit?? (.*) poss??de plusieurs (.*)",
		"entit?? (.*) a plusieurs (.*)"
	],
	"relationshipHasManyWithName": [
		"entity (.*) has many (.*) called (.*)",
		"entity (.*) has many (.*) with name (.*)",
		"entit?? (.*) poss??de plusieurs (.*) appel?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) nomm?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) nomm??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) nomm??es (.*)",
		"entit?? (.*) a plusieurs (.*) appel?? (.*)",
		"entit?? (.*) a plusieurs (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) nomm?? (.*)",
		"entit?? (.*) a plusieurs (.*) nomm??s (.*)",
		"entit?? (.*) a plusieurs (.*) nomm??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) appel?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) nomm?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) nomm??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) nomm??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) appel?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) nomm?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) nomm??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) nomm??es (.*)",
	],
	"relationshipHasManyPreset": [
		"entity (.*) has many preset (.*)",
		"entity (.*) has many existing (.*)",

		"entity (.*) has many preset (.*) called (.*)",
		"entity (.*) has many existing (.*) called (.*)",
		"entity (.*) has many preset (.*) with name (.*)",
		"entity (.*) has many existing (.*) with name (.*)",

		"l'entit?? (.*) a plusieurs (.*) pr??d??fini",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finis",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finie",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finies",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??fini",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finis",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finie",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finies",
		"l'entit?? (.*) a plusieurs (.*) existant",
		"l'entit?? (.*) a plusieurs (.*) existants",
		"l'entit?? (.*) a plusieurs (.*) existante",
		"l'entit?? (.*) a plusieurs (.*) existantes",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existant",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existants",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existante",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existantes",

		"entit?? (.*) a plusieurs (.*) pr??d??fini",
		"entit?? (.*) a plusieurs (.*) pr??d??finis",
		"entit?? (.*) a plusieurs (.*) pr??d??finie",
		"entit?? (.*) a plusieurs (.*) pr??d??finies",
		"entit?? (.*) a plusieurs (.*) existant",
		"entit?? (.*) a plusieurs (.*) existants",
		"entit?? (.*) a plusieurs (.*) existante",
		"entit?? (.*) a plusieurs (.*) existantes",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??fini",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finis",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finie",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finies",
		"entit?? (.*) a plusieurs (.*) d??j?? existant",
		"entit?? (.*) a plusieurs (.*) d??j?? existants",
		"entit?? (.*) a plusieurs (.*) d??j?? existante",
		"entit?? (.*) a plusieurs (.*) d??j?? existantes",

		"l'entit?? (.*) a plusieurs (.*) pr??d??fini appel?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finis appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finie appel??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finies appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??fini appel?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finis appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finie appel??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finies appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant appel?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) existants appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) existante appel??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) existantes appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existant appel?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existants appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existante appel??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existantes appel??es (.*)",

		"entit?? (.*) a plusieurs (.*) pr??d??fini appel?? (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??finis appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??finie appel??e (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??finies appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) existant appel?? (.*)",
		"entit?? (.*) a plusieurs (.*) existants appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) existante appel??e (.*)",
		"entit?? (.*) a plusieurs (.*) existantes appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??fini appel?? (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finis appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finie appel??e (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finies appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existant appel?? (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existants appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existante appel??e (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existantes appel??es (.*)",

		"l'entit?? (.*) a plusieurs (.*) pr??d??fini nomm?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finis nomm??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finie nomm??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??finies nomm??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??fini nomm?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finis nomm??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finie nomm??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? pr??d??finies nomm??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant nomm?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) existants nomm??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) existante nomm??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) existantes nomm??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existant nomm?? (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existants nomm??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existante nomm??e (.*)",
		"l'entit?? (.*) a plusieurs (.*) d??j?? existantes nomm??es (.*)",

		"entit?? (.*) a plusieurs (.*) pr??d??fini nomm?? (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??finis nomm??s (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??finie nomm??e (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??finies nomm??es (.*)",
		"entit?? (.*) a plusieurs (.*) existant nomm?? (.*)",
		"entit?? (.*) a plusieurs (.*) existants nomm??s (.*)",
		"entit?? (.*) a plusieurs (.*) existante nomm??e (.*)",
		"entit?? (.*) a plusieurs (.*) existantes nomm??es (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??fini nomm?? (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finis nomm??s (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finie nomm??e (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? pr??d??finies nomm??es (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existant nomm?? (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existants nomm??s (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existante nomm??e (.*)",
		"entit?? (.*) a plusieurs (.*) d??j?? existantes nomm??es (.*)",

		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finis",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finie",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finies",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??fini",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finis",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finie",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finies",
		"l'entit?? (.*) poss??de plusieurs (.*) existant",
		"l'entit?? (.*) poss??de plusieurs (.*) existants",
		"l'entit?? (.*) poss??de plusieurs (.*) existante",
		"l'entit?? (.*) poss??de plusieurs (.*) existantes",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existant",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existants",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existante",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existantes",

		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finis",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finie",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finies",
		"entit?? (.*) poss??de plusieurs (.*) existant",
		"entit?? (.*) poss??de plusieurs (.*) existants",
		"entit?? (.*) poss??de plusieurs (.*) existante",
		"entit?? (.*) poss??de plusieurs (.*) existantes",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??fini",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finis",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finie",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finies",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existant",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existants",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existante",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existantes",

		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini appel?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finis appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finie appel??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finies appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??fini appel?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finis appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finie appel??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finies appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant appel?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existants appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existante appel??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existantes appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existant appel?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existants appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existante appel??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existantes appel??es (.*)",

		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini appel?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finis appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finie appel??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finies appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant appel?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existants appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existante appel??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existantes appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??fini appel?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finis appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finie appel??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finies appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existant appel?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existants appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existante appel??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existantes appel??es (.*)",

		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini nomm?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finis nomm??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finie nomm??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??finies nomm??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??fini nomm?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finis nomm??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finie nomm??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finies nomm??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant nomm?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existants nomm??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existante nomm??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existantes nomm??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existant nomm?? (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existants nomm??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existante nomm??e (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) d??j?? existantes nomm??es (.*)",

		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini nomm?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finis nomm??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finie nomm??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??finies nomm??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant nomm?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existants nomm??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existante nomm??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existantes nomm??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??fini nomm?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finis nomm??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finie nomm??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? pr??d??finies nomm??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existant nomm?? (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existants nomm??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existante nomm??e (.*)",
		"entit?? (.*) poss??de plusieurs (.*) d??j?? existantes nomm??es (.*)"
	],
	"relationshipHasManyPresetUsing": [
		"entity (.*) has many preset (.*) using (.*)",
		"entity (.*) has many existing (.*) using (.*)",
		"entity (.*) has many preset (.*) through (.*)",
		"entity (.*) has many existing (.*) through (.*)",
		"entity (.*) has many preset (.*) using field (.*)",
		"entity (.*) has many existing (.*) using field (.*)",
		"entity (.*) has many preset (.*) through field (.*)",
		"entity (.*) has many existing (.*) through field (.*)",
		"entity (.*) has many preset (.*) using the field (.*)",
		"entity (.*) has many existing (.*) using the field (.*)",
		"entity (.*) has many preset (.*) through the field (.*)",
		"entity (.*) has many existing (.*) through the field (.*)",

		"entity (.*) has many preset (.*) using (.*) called (.*)",
		"entity (.*) has many existing (.*) using (.*) called (.*)",
		"entity (.*) has many preset (.*) through (.*) called (.*)",
		"entity (.*) has many existing (.*) through (.*) called (.*)",
		"entity (.*) has many preset (.*) using field (.*) called (.*)",
		"entity (.*) has many existing (.*) using field (.*) called (.*)",
		"entity (.*) has many preset (.*) through field (.*) called (.*)",
		"entity (.*) has many existing (.*) through field (.*) called (.*)",
		"entity (.*) has many preset (.*) using the field (.*) called (.*)",
		"entity (.*) has many existing (.*) using the field (.*) called (.*)",
		"entity (.*) has many preset (.*) through the field (.*) called (.*)",
		"entity (.*) has many existing (.*) through the field (.*) called (.*)",

		"entity (.*) has many preset (.*) using (.*) with name (.*)",
		"entity (.*) has many existing (.*) using (.*) with name (.*)",
		"entity (.*) has many preset (.*) through (.*) with name (.*)",
		"entity (.*) has many existing (.*) through (.*) with name (.*)",
		"entity (.*) has many preset (.*) using field (.*) with name (.*)",
		"entity (.*) has many existing (.*) using field (.*) with name (.*)",
		"entity (.*) has many preset (.*) through field (.*) with name (.*)",
		"entity (.*) has many existing (.*) through field (.*) with name (.*)",
		"entity (.*) has many preset (.*) using the field (.*) with name (.*)",
		"entity (.*) has many existing (.*) using the field (.*) with name (.*)",
		"entity (.*) has many preset (.*) through the field (.*) with name (.*)",
		"entity (.*) has many existing (.*) through the field (.*) with name (.*)",

		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en utilisant (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en affichant (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en affichant (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant le champ (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en utilisant le champ (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en affichant le champ (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en affichant le champ (.*)",

		"entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant (.*)",
		"entit?? (.*) a plusieurs (.*) existant en utilisant (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en affichant (.*)",
		"entit?? (.*) a plusieurs (.*) existant en affichant (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant le champ (.*)",
		"entit?? (.*) a plusieurs (.*) existant en utilisant le champ (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en affichant le champ (.*)",
		"entit?? (.*) a plusieurs (.*) existant en affichant le champ (.*)",

		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en utilisant (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en affichant (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en affichant (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en utilisant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en affichant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en utilisant (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en affichant (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en affichant (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en utilisant le champ (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??es (.*)",
		"l'entit?? (.*) a plusieurs (.*) existant en affichant le champ (.*) appel??es (.*)",

		"entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) existant en utilisant (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en affichant (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) existant en affichant (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) existant en utilisant le champ (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) existant en affichant le champ (.*) appel??s (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) existant en utilisant (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en affichant (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) existant en affichant (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) existant en utilisant le champ (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??es (.*)",
		"entit?? (.*) a plusieurs (.*) existant en affichant le champ (.*) appel??es (.*)",

		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en utilisant (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en affichant (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant le champ (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en utilisant le champ (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant le champ (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en affichant le champ (.*)",

		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en utilisant (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en affichant (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant le champ (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en utilisant le champ (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant le champ (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en affichant le champ (.*)",

		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en utilisant (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en affichant (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en utilisant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en affichant le champ (.*) appel??s (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en utilisant (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en affichant (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en utilisant le champ (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??es (.*)",
		"l'entit?? (.*) poss??de plusieurs (.*) existant en affichant le champ (.*) appel??es (.*)",

		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en utilisant (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en affichant (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en utilisant le champ (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en affichant le champ (.*) appel??s (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en utilisant (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en affichant (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en utilisant le champ (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en utilisant le champ (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) pr??d??fini en affichant le champ (.*) appel??es (.*)",
		"entit?? (.*) poss??de plusieurs (.*) existant en affichant le champ (.*) appel??es (.*)"
	],
	"createFieldRelatedToMultipleCheckbox": [
		"create field (.*) related to multiple (.*) with type checkbox",
		"add field (.*) related to multiple (.*) with type checkbox",
		"create field (.*) related to many (.*) with type checkbox",
		"add field (.*) related to many (.*) with type checkbox",
		"cr??er un champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher",
		"ajouter un champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher",
		"cr??er champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher",
		"ajouter champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher"
	],
	"createFieldRelatedToMultipleCheckboxUsing": [
		"create field (.*) related to multiple (.*) with type checkbox using (.*)",
		"add field (.*) related to multiple (.*) with type checkbox using (.*)",
		"create field (.*) related to many (.*) with type checkbox using (.*)",
		"add field (.*) related to many (.*) with type checkbox using (.*)",
		"cr??er un champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en utilisant (.*)",
		"cr??er champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en utilisant (.*)",
		"cr??er un champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en affichant (.*)",
		"cr??er champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en affichant (.*)",
		"ajouter un champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en utilisant (.*)",
		"ajouter un champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en affichant (.*)",
		"ajouter champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en utilisant (.*)",
		"ajouter champ (.*) reli?? ?? plusieurs (.*) avec le type case ?? cocher en affichant (.*)"
	],
	"createFieldRelatedToMultiple": [
		"create field (.*) related to multiple (.*)",
		"add field (.*) related to multiple (.*)",
		"create field (.*) related to many (.*)",
		"add field (.*) related to many (.*)",
		"cr??er un champ (.*) reli?? ?? plusieurs (.*)",
		"ajouter un champ (.*) reli?? ?? plusieurs (.*)",
		"cr??er champ (.*) reli?? ?? plusieurs (.*)",
		"ajouter champ (.*) reli?? ?? plusieurs (.*)"
	],
	"createFieldRelatedToMultipleUsing": [
		"create field (.*) related to multiple (.*) using (.*)",
		"add field (.*) related to multiple (.*) using (.*)",
		"create field (.*) related to many (.*) using (.*)",
		"add field (.*) related to many (.*) using (.*)",
		"cr??er un champ (.*) reli?? ?? plusieurs (.*) en utilisant (.*)",
		"cr??er champ (.*) reli?? ?? plusieurs (.*) en utilisant (.*)",
		"cr??er un champ (.*) reli?? ?? plusieurs (.*) en affichant (.*)",
		"cr??er champ (.*) reli?? ?? plusieurs (.*) en affichant (.*)",
		"ajouter un champ (.*) reli?? ?? plusieurs (.*) en utilisant (.*)",
		"ajouter un champ (.*) reli?? ?? plusieurs (.*) en affichant (.*)",
		"ajouter champ (.*) reli?? ?? plusieurs (.*) en utilisant (.*)",
		"ajouter champ (.*) reli?? ?? plusieurs (.*) en affichant (.*)"
	],
	"createNewComponentStatusWithName": [
		"create component status called (.*)",
		"add component status called (.*)",
		"create component status with name (.*)",
		"add component status with name (.*)",
		"ajouter un composant statut appel?? (.*)",
		"ajouter composant statut appel?? (.*)",
		"cr??er composant statut appel?? (.*)",
		"cr??er un composant statut appel?? (.*)"
	],
	"createNewComponentStatus": [
		"create component status",
		"add component status",
		"ajouter un composant statut",
		"cr??er un composant statut",
		"ajouter composant statut",
		"cr??er composant statut"
	],
	"deleteComponentStatus": [
		"delete component status",
		"remove component status",
		"supprimer un composant statut",
		"supprimer un statut",
		"supprimer composant statut",
		"supprimer statut"
	],
	"deleteComponentStatusWithName": [
		"delete component status with name (.*)",
		"remove component status with name (.*)",

		"delete component status called (.*)",
		"remove component status called (.*)",

		"supprimer un composant statut appel?? (.*)",
		"supprimer composant statut appel?? (.*)",
		"supprimer le composant statut appel?? (.*)",
		"supprimer un statut appel?? (.*)",
		"supprimer le statut appel?? (.*)",
		"supprimer statut appel?? (.*)",

		"supprimer un composant statut nomm?? (.*)",
		"supprimer composant statut nomm?? (.*)",
		"supprimer le composant statut nomm?? (.*)",
		"supprimer un statut nomm?? (.*)",
		"supprimer le statut nomm?? (.*)",
		"supprimer statut nomm?? (.*)"
	],
	"addComponentFileStorageWithName": [
		"create component file storage with name (.*)",
		"create component filestorage with name (.*)",
		"add component file storage with name (.*)",
		"add component filestorage with name (.*)",
		"create component file storage called (.*)",
		"create component filestorage called (.*)",
		"add component file storage called (.*)",
		"add component filestorage called (.*)",
		"cr??er composant filestorage appel?? (.*)",
		"ajouter composant filestorage appel?? (.*)",
		"cr??er un composant filestorage appel?? (.*)",
		"ajouter un composant filestorage appel?? (.*)",
		"cr??er le composant filestorage appel?? (.*)",
		"ajouter le composant filestorage appel?? (.*)",
		"cr??er composant de stockage de fichier appel?? (.*)",
		"ajouter composant de stockage de fichier appel?? (.*)",
		"cr??er uncomposant de stockage de fichier appel?? (.*)",
		"ajouter un composant de stockage de fichier appel?? (.*)",
		"cr??er le composant de stockage de fichier appel?? (.*)",
		"ajouter le composant de stockage de fichier appel?? (.*)",
		"cr??er composant de stockage appel?? (.*)",
		"ajouter composant de stockage appel?? (.*)",
		"cr??er un composant de stockage appel?? (.*)",
		"ajouter un composant de stockage appel?? (.*)",
		"cr??er le composant de stockage appel?? (.*)",
		"ajouter le composant de stockage appel?? (.*)",
		"ajouter composant stockage fichier appel?? (.*)",
		"ajouter composant de stockage appel?? (.*)",
		"ajouter composant de stockage de fichier appel?? (.*)",
		"ajouter un composant stockage fichier appel?? (.*)",
		"ajouter un composant de stockage appel?? (.*)",
		"ajouter un composant de stockage de fichier appel?? (.*)",
		"ajouter le composant de stockage de fichier appel?? (.*)",
		"ajouter le composant de stockage appel?? (.*)",
		"cr??er composant filestorage nomm?? (.*)",
		"ajouter composant filestorage nomm?? (.*)",
		"cr??er un composant filestorage nomm?? (.*)",
		"ajouter un composant filestorage nomm?? (.*)",
		"cr??er le composant filestorage nomm?? (.*)",
		"ajouter le composant filestorage nomm?? (.*)",
		"cr??er composant de stockage de fichier nomm?? (.*)",
		"ajouter composant de stockage de fichier nomm?? (.*)",
		"cr??er uncomposant de stockage de fichier nomm?? (.*)",
		"ajouter un composant de stockage de fichier nomm?? (.*)",
		"cr??er le composant de stockage de fichier nomm?? (.*)",
		"ajouter le composant de stockage de fichier nomm?? (.*)",
		"cr??er composant de stockage nomm?? (.*)",
		"ajouter composant de stockage nomm?? (.*)",
		"cr??er un composant de stockage nomm?? (.*)",
		"ajouter un composant de stockage nomm?? (.*)",
		"cr??er le composant de stockage nomm?? (.*)",
		"ajouter le composant de stockage nomm?? (.*)",
		"ajouter composant stockage fichier nomm?? (.*)",
		"ajouter composant de stockage nomm?? (.*)",
		"ajouter composant de stockage de fichier nomm?? (.*)",
		"ajouter un composant stockage fichier nomm?? (.*)",
		"ajouter un composant de stockage nomm?? (.*)",
		"ajouter un composant de stockage de fichier nomm?? (.*)",
		"ajouter le composant de stockage de fichier nomm?? (.*)",
		"ajouter le composant de stockage nomm?? (.*)"
	],
	"addComponentFileStorage": [
		"create component file storage",
		"create component filestorage",
		"add component file storage",
		"add component filestorage",
		"cr??er composant filestorage",
		"ajouter composant filestorage",
		"cr??er un composant filestorage",
		"ajouter un composant filestorage",
		"cr??er le composant filestorage",
		"ajouter le composantfilestorage",
		"cr??er composant de stockage de fichier",
		"ajouter composant de stockage de fichier",
		"cr??er un composant de stockage de fichier",
		"ajouter un composant de stockage de fichier",
		"cr??er le composant de stockage de fichier",
		"ajouter le composant de stockage de fichier",
		"cr??er composant de stockage de fichier",
		"ajouter composant de stockage de fichier",
		"cr??er un composant de stockage de fichier",
		"ajouter un composant de stockage de fichier",
		"cr??er le composant de stockage de fichier",
		"ajouter le composant de stockage de fichier",
		"cr??er composant de stockage",
		"ajouter composant de stockage",
		"cr??er un composant de stockage",
		"ajouter un composant de stockage",
		"cr??er le composant de stockage",
		"ajouter le composant de stockage",
		"ajouter un stockage de documents",
		"cr??er un stockage de documents",
		"ajouter stockage de documents",
		"cr??er stockage de documents"
	],
	"createNewComponentAgenda": [
		"create component agenda",
		"add component agenda",
		"add an agenda",
		"add agenda",
		"cr??er un composant agenda",
		"ajouter un composant agenda",
		"cr??er un agenda",
		"ajouter un agenda",
		"cr??er le composant agenda",
		"ajouter le composant agenda",
		"cr??er l'agenda",
		"ajouter l'agenda",
		"cr??er composant agenda",
		"ajouter composant agenda",
		"cr??er agenda",
		"ajouter agenda",
		"create component timeline",
		"add component timeline",
		"add an timeline",
		"add timeline",
		"cr??er un composant ligne de temps",
		"ajouter un composant ligne de temps",
		"cr??er un ligne de temps",
		"ajouter un ligne de temps"
	],
	"createNewComponentAgendaWithName": [
		"create component agenda with name (.*)",
		"add component agenda with name (.*)",
		"add agenda with name (.*)",
		"create component agenda called (.*)",
		"add component agenda called (.*)",
		"add agenda called (.*)",
		"cr??er un composant agenda appel?? (.*)",
		"ajouter un composant agenda appel?? (.*)",
		"cr??er le composant agenda appel?? (.*)",
		"ajouter le composant agenda appel?? (.*)",
		"cr??er composant agenda appel?? (.*)",
		"ajouter composant agenda appel?? (.*)",
		"cr??er un agenda appel?? (.*)",
		"ajouter un agenda appel?? (.*)",
		"cr??er l'agenda appel?? (.*)",
		"ajouter l'agenda appel?? (.*)",
		"cr??er agenda appel?? (.*)",
		"ajouter agenda appel?? (.*)",
		"cr??er un composant agenda nomm?? (.*)",
		"ajouter un composant agenda nomm?? (.*)",
		"cr??er le composant agenda nomm?? (.*)",
		"ajouter le composant agenda nomm?? (.*)",
		"cr??er composant agenda nomm?? (.*)",
		"ajouter composant agenda nomm?? (.*)",
		"cr??er un agenda nomm?? (.*)",
		"ajouter un agenda nomm?? (.*)",
		"cr??er l'agenda nomm?? (.*)",
		"ajouter l'agenda nomm?? (.*)",
		"cr??er agenda nomm?? (.*)",
		"ajouter agenda nomm?? (.*)",
		"create component timeline with name (.*)",
		"add component timeline with name (.*)",
		"add timeline with name (.*)",
		"cr??er un composant ligne de temps nomm?? (.*)",
		"ajouter un composant ligne de temps nomm?? (.*)",
		"cr??er une ligne de temps nomm?? (.*)",
		"ajouter une ligne de temps nomm?? (.*)",
		"cr??er une ligne de temps avec le nom (.*)",
		"ajouter une ligne de temps avec le nom (.*)",
		"cr??er une ligne de temps appel?? (.*)",
		"ajouter une ligne de temps appel?? (.*)"
	],
	"deleteAgenda": [
		"delete component agenda",
		"remove component agenda",
		"remove an agenda",
		"delete an agenda",
		"remove agenda",
		"delete agenda",
		"delete component timeline",
		"remove component timeline",
		"remove an timeline",
		"remove timeline",

		"supprimer composant agenda",
		"supprimer le composant agenda",
		"supprimer agenda",
		"supprimer l'agenda",
		"supprimer le composant ligne de temps",
		"supprimer la ligne de temps"
	],
	"deleteAgendaWithName": [
		"delete component agenda with name (.*)",
		"remove component agenda with name (.*)",
		"remove an agenda with name (.*)",
		"delete an agenda with name (.*)",
		"remove agenda with name (.*)",
		"delete agenda with name (.*)",
		"delete component timeline with name (.*)",
		"remove component timeline with name (.*)",
		"remove an timeline with name (.*)",
		"remove timeline with name (.*)",
		"delete component agenda called (.*)",
		"remove component agenda called (.*)",
		"remove an agenda called (.*)",
		"delete an agenda called (.*)",
		"remove agenda called (.*)",
		"delete agenda called (.*)",
		"delete component timeline called (.*)",
		"remove component timeline called (.*)",
		"remove an timeline called (.*)",
		"remove timeline called (.*)",

		"supprimer composant agenda appel?? (.*)",
		"supprimer le composant agenda appel?? (.*)",
		"supprimer agenda appel?? (.*)",
		"supprimer l'agenda appel?? (.*)",
		"supprimer le composant ligne de temps appel??e (.*)",
		"supprimer la ligne de temps appel??e (.*)",
		"supprimer composant agenda nomm?? (.*)",
		"supprimer le composant agenda nomm?? (.*)",
		"supprimer agenda nomm?? (.*)",
		"supprimer l'agenda nomm?? (.*)",
		"supprimer le composant ligne de temps nomm??e (.*)",
		"supprimer la ligne de temps nomm??e (.*)"
	],
	"createNewComponentCra": [
		"ajouter composant gestion de temps",
		"ajouter un composant gestion de temps",
		"create component cra",
		"add component cra",
		"create component activity report",
		"add component activity report",
		"create component time sheet",
		"add component time sheet",
		"create component timesheet",
		"add component timesheet",
		"cr??er un composant cra",
		"ajouter un composant cra",
		"cr??er composant cra",
		"ajouter composant cra",
		"cr??er le composant cra",
		"ajouter le composant cra",
		"cr??er un composant compte-rendu d'activit??",
		"ajouter un composant compte-rendu d'activit??",
		"cr??er composant compte-rendu d'activit??",
		"ajouter composant compte-rendu d'activit??",
		"cr??er un composant compte-rendu d'activit??s",
		"ajouter un composant compte-rendu d'activit??s",
		"cr??er composant compte-rendu d'activit??s",
		"ajouter composant compte-rendu d'activit??s"
	],
	"createNewComponentAddress": [
		"add component address",
		"create component address",
		"ajouter un composant adresse",
		"cr??er un composant adresse",
		"ajouter composant adresse",
		"cr??er composant adresse"
	],
	"createNewComponentAddressWithName": [
		"add component address with name (.*)",
		"add component address called (.*)",
		"create component address with name (.*)",
		"create component address called (.*)",
		"ajouter un composant adresse nomm?? (.*)",
		"ajouter un composant adresse appel?? (.*)",
		"ajouter composant adresse nomm?? (.*)",
		"ajouter composant adresse appel?? (.*)"
	],
	"deleteComponentAddress": [
		"delete component address",
		"supprimer composant adresse",
		"supprimer le composant adresse"
	],
	"createComponentChat": [
		"add component chat",
		"create component chat",
		"ajouter le composant Discussion",
		"ajouter composant Discussion",
		"ajouter le composant discussion",
		"ajouter composant discussion"
	],
	"setLogo": [
		"add logo (.*)",
		"add a logo (.*)",
		"set a logo (.*)",
		"set logo (.*)",
		"mettre un logo (.*)",
		"mettre logo (.*)",
		"ajouter logo (.*)",
		"ajouter un logo (.*)"
	],
	"removeLogo": [
		"remove logo",
		"remove the logo",
		"delete the logo",
		"delete logo",
		"supprimer un logo",
		"supprimer logo",
		"enlever le logo",
		"enlever logo"
	],
	"setLayout": [
		"set layout (.*)",
		"appliquer le layout (.*)",
		"appliquer la disposition (.*)",
		"appliquer layout (.*)",
		"appliquer disposition (.*)",
		"mettre le layout (.*)",
		"mettre la disposition (.*)",
		"mettre layout (.*)",
		"mettre disposition (.*)"
	],
	"listLayout": [
		"list layout",
		"list all layout",
		"lister les layout",
		"lister disposition",
		"lister les dispositions",
		"afficher les dispositions"
	],
	"setTheme": [
		"set theme (.*)",
		"appliquer le th??me (.*)",
		"appliquer th??me (.*)",
		"mettre le th??me (.*)",
		"mettre th??me (.*)"
	],
	"listTheme": [
		"list all theme",
		"list theme",
		"list available theme",
		"lister les th??mes",
		"lister th??mes"
	],
	"setIcon": [
		"set icon (.*)",
		"mettre l'ic??ne (.*)",
		"mettre l'icone (.*)",
		"mettre ic??ne (.*)",
		"mettre icone (.*)",
		"mettre une ic??ne (.*)",
		"mettre une icone (.*)",
		"set icon (.*) to entity (.*)",
		"set icon (.*) on entity (.*)",
		"set icon (.*) on (.*)",
		"set icon (.*) to (.*)",
		"mettre l'ic??ne (.*) sur l'entit?? (.*)",
		"mettre l'icone (.*) sur l'entit?? (.*)",
		"mettre l'ic??ne (.*) sur (.*)",
		"mettre l'icone (.*) sur (.*)",
		"mettre l'icone (.*) a l'entit?? (.*)",
		"mettre l'ic??ne (.*) ?? l'entit?? (.*)",
		"mettre l'ic??ne (.*) ?? (.*)",
		"mettre une ic??ne (.*) ?? (.*)",
		"mettre une ic??ne (.*) sur (.*)",
		"mettre ic??ne (.*) ?? (.*)",
		"mettre ic??ne (.*) sur (.*)",
		"mettre l'ic??ne (.*) sur (.*)",
		"mettre l'icone (.*) ?? (.*)",
		"mettre l'icone (.*) sur (.*)"
	],
	"listIcon": [
		"list icon",
		"list icons",
		"lister les icones",
		"lister icones",
		"lister icone",
		"lister icon",
		"lister ic??nes",
		"lister ic??ne"
	],
	"createWidgetPiechart": [
		"create widget piechart on entity (.*) for field (.*)",
		"add widget piechart on entity (.*) for field (.*)",
		"create widget piechart on entity (.*) for (.*)",
		"add widget piechart on entity (.*) for (.*)",
		"create widget piechart for field (.*)",
		"add widget piechart for field (.*)",
		"create widget piechart for (.*)",
		"add widget piechart for (.*)",
		"ajouter widget piechart sur l'entit?? (.*) pour le champ (.*)",
		"ajouter widget piechart sur entit?? (.*) pour le champ (.*)",
		"ajouter widget piechart pour le champ (.*)"
	],
	"createWidgetPiechartWithoutLegend": [
		"create widget piechart on entity (.*) for field (.*) without legend",
		"create widget piechart on entity (.*) for (.*) without legend",
		"create widget piechart for field (.*) without legend",
		"create widget piechart for (.*) without legend",
		"add widget piechart on entity (.*) for field (.*) without legend",
		"add widget piechart on entity (.*) for (.*) without legend",
		"add widget piechart for field (.*) without legend",
		"add widget piechart for (.*) without legend",
		"ajouter widget piechart pour le champ (.*) sans l??gende",
		"ajouter widget piechart sur l'entit?? (.*) pour le champ (.*) sans l??gende",
		"ajouter widget piechart sur entit?? (.*) pour le champ (.*) sans l??gende"
	],
	"createWidgetLastRecordsWithLimit": [
		"create widget last records limited to (.*) records with columns (.*)",
		"create widget last records on entity (.*) limited to (.*) records with columns (.*)",
		"add widget last records limited to (.*) records with columns (.*)",
		"add widget last records on entity (.*) limited to (.*) records with columns (.*)",
		"ajouter un widget derniers enregistrements sur l'entit?? (.*) limit?? ?? (.*) enregistrements avec les colonnes (.*)",
		"ajouter widget derniers enregistrements sur l'entit?? (.*) limit?? ?? (.*) enregistrements avec les colonnes (.*)",
		"cr??er un widget derniers enregistrements limit?? ?? (.*) enregistrements avec les colonnes (.*)",
		"cr??er un widget derniers enregistrements sur l'entit?? (.*) limit?? ?? (.*) enregistrements avec les colonnes (.*)",
		"cr??er widget derniers enregistrements limit?? ?? (.*) enregistrements avec les colonnes (.*)",
		"cr??er widget derniers enregistrements sur l'entit?? (.*) limit?? ?? (.*) enregistrements avec les colonnes (.*)"
	],
	"createWidgetLastRecords": [
		"create widget last records with columns (.*)",
		"create widget last records on entity (.*) with columns (.*)",
		"add widget last records with columns (.*)",
		"add widget last records on entity (.*) with columns (.*)",
		"ajouter un widget derniers enregistrements avec les colonnes (.*)",
		"ajouter un widget derniers enregistrements sur l'entit?? (.*) avec les colonnes (.*)",
		"ajouter widget derniers enregistrements avec les colonnes (.*)",
		"ajouter widget derniers enregistrements sur l'entit?? (.*) avec les colonnes (.*)",
		"cr??er un widget derniers enregistrements avec les colonnes (.*)",
		"cr??er un widget derniers enregistrements sur l'entit?? (.*) avec les colonnes (.*)",
		"cr??er widget derniers enregistrements avec les colonnes (.*)",
		"cr??er widget derniers enregistrements sur l'entit?? (.*) avec les colonnes (.*)"
	],
	"createWidgetOnEntity": [
		"cr??er une (.*) sur l'entit?? (.*)",
		"cr??er un widget (.*) sur l'entit?? (.*)",
		"ajouter une (.*) sur l'entit?? (.*)",
		"ajouter un widget (.*) sur l'entit?? (.*)",
		"cr??er widget (.*) sur l'entit?? (.*)",
		"ajouter (.*) sur l'entit?? (.*)",
		"ajouter widget (.*) sur l'entit?? (.*)",
		"add widget (.*) on entity (.*)",
		"create widget (.*) on entity (.*)",
		"add a widget (.*) on entity (.*)",
		"create a widget (.*) on entity (.*)"
	],
	"createWidget": [
		"add widget (.*)",
		"create widget (.*)",
		"ajouter widget (.*)",
		"cr??er widget (.*)",
		"ajouter une (.*)",
		"ajouter un widget (.*)",
		"cr??er une (.*)",
		"cr??er un widget (.*)"
	],
	"deleteWidget": [
		"delete widget (.*)",
		"delete widget (.*)",
		"delete widget (.*)",
		"delete widget (.*)",
		"supprimer widget (.*)",
		"supprimer le widget (.*)",
		"supprimer le widget (.*)"
	],
	"deleteEntityWidgets": [
		"delete widgets of (.*)",
		"delete widgets of entity (.*)",
		"delete all widgets of entity (.*)",
		"delete all widgets of (.*)",
		"supprimer les widgets de (.*)",
		"supprimer tous les widgets de (.*)",
		"supprimer les widgets de l'entit?? (.*)",
		"supprimer tous les widgets de l'entit?? (.*)"
	],
	"createComponentDocumentTemplate": [
		"add component document template",
		"ajouter un composant document template",
		"ajouter le composant document template",
		"ajouter composant document template",
		"ajouter composant mod??le de document",
		"ajouter un composant mod??le de document",
		"ajouter le composant mod??le de document"
	],
	"createComponentDocumentTemplateWithName": [
		"add component document template with name (.*)",
		"add component document template called (.*)",
		"ajouter un composant mod??le de document appel?? (.*)",
		"ajouter un composant mod??le de document nomm?? (.*)",
		"ajouter composant mod??le de document appel?? (.*)",
		"ajouter composant mod??le de document nomm?? (.*)",
		"ajouter le composant mod??le de document appel?? (.*)"
	],
	"deleteComponentDocumentTemplate": [
		"delete component document template",
		"supprimer le composant document template",
		"supprimer composant document template",
		"supprimer composant mod??le de document",
		"supprimer un composant mod??le de document"
	],
	"addTitle": [
		"add title (.*)",
		"add title (.*) after (.*)",
		"add title (.*) after field (.*)",

		"ajouter titre (.*)",
		"ajouter titre (.*) apr??s (.*)",
		"ajouter un titre (.*)",
		"ajouter un titre (.*) apr??s (.*)",
		"ajouter un titre (.*) apr??s le champ (.*)"
	],
	"removeTitle": [
		"remove title (.*)",
		"delete title (.*)",
		"supprimer  titre (.*)",
		"supprimer le titre (.*)"
	]
};

// ******* Parse *******
exports.parse = (instruction) => {

	let instructionResult = {
		instructionLength: 0
	};

	for (const action in bot_instructions) {
		for (let i = 0; i < bot_instructions[action].length; i++) {
			const regStr = bot_instructions[action][i];
			const regExp = new RegExp(regStr, "ig");

			const result = regExp.exec(instruction);
			if (result !== null) {
				/* Get the most complicated instruction found */
				if (instructionResult.instructionLength < regStr.length) {
					instructionResult = {
						action: action,
						result: result,
						instructionLength: regStr.length
					};
				}
			}
		}
	}

	let data = {};
	if (typeof instructionResult.action !== "undefined") {
		data = this[instructionResult.action](instructionResult.result);
		data.instruction = instruction;
	} else {
		throw new Error('error.cannotFindInstruction');
	}

	return data;
}

// ******* Completion *******
exports.complete = function (instruction) {

	let answers = [];

	// Check all bot_instructions key phrases
	for (const action in bot_instructions) {

		// Check each blocks
		for (let i = 0; i < bot_instructions[action].length; i++) {

			// Template to compare to
			const template = bot_instructions[action][i].split(" ");

			// Split current key phrase and instructions into arrays to loop
			const instr = instruction.trim().split(" ");

			let k = 0; // index in template
			let m = 0; // index in instruction

			const l = instr.length;
			const n = template.length;

			let answer = " ";
			let valid = true;
			let variable = false;
			while (m < l && k < n && valid) {
				// Check if words are the same, goto next word
				if (template[k] == "(.*)" || template[k] == instr[m]) {
					variable = false;
					k++;
				} else {
					// Check if beginning of word are the same
					const sublen = instr[m].length;
					if (template[k].substring(0, sublen) == instr[m]) {
						// Do not increment k, we are still on keyword
						variable = false;
					} else if (template[k] == "(.*)" && template[k + 1]) { // If we parse the variable value
						// Check next word
						k++;
						variable = true;
					} else if (!variable) {
						// If we are not parsing a variable, it means template is not appropriate => Exit
						valid = false;
					}
				}
				m++;
			}

			// Instruction has respected template, so send next keyword if any
			if (valid && m == l) {
				let found = false;
				let firstLoop = true;

				while (k < n && !found) {
					// Return next keyword
					if (template[k] != "(.*)")
						answer = answer + template[k] + " ";
					else {
						if (template[k - 1] == "type")
							answer = answer + "[type] ";
						// Return [variable] to explain this is something dynamic
						else if (template[k - 1] == 'widget')
							answer = answer + '[widget] ';
						else
							answer = answer + "[variable] ";

						// If first loop on variable, we need to display possible end of instruction
						// Else, it means we have keyword at the beginning of suggestion, so we cut on variable step
						if (!firstLoop)
							found = true;
					}

					firstLoop = false;
					k++;
				}

				// Add list of types to answer
				if (answer.trim() == "[type]")
					answers = [...answers, ...bot_helper.getNodeaTypes()];
				else if (answer.trim() == '[widget]')
					answers = [...answers, 'info', 'stat', 'statistique', 'piechart']
				// Build array of string answers
				else
					answers.push(answer.trim());
			}
		}
	}

	// Filter array of results (remove double values)
	const out = [], obj = {}, len = answers.length;
	for (let i = 0; i < len; i++)
		obj[answers[i]] = 0;
	for (const j in obj)
		out.push(j);

	// Sort array of results
	out.sort();

	// out.reverse();
	return out.filter(x => x != '');
}

module.exports = exports;