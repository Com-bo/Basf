import Util from '@/common/util';

export const TableTypeMap: any = {
  GlobalDelegate: {
    SPList: 'GlobalDelegate',
    CDSTable: 'globaldelegates',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'Requester',
        SPList: 'Requester',
        CDSTable: 'requester',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'RequesterPrincipalName',
        SPList: 'RequesterPrincipalName',
        CDSTable: 'requesterprincipalname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'AssignedName',
        SPList: 'AssignedName',
        CDSTable: 'assignedname',
        Type: 'Text',
      },
      {
        Key: 'WFAssignedTo',
        SPList: 'WFAssignedTo',
        CDSTable: 'wfassignedto',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'AssignedPrincipalName',
        SPList: 'AssignedPrincipalName',
        CDSTable: 'assignedprincipalname',
        Type: 'Text',
      },
      {
        Key: 'WFStartDate',
        SPList: 'WFStartDate',
        CDSTable: 'wfstartdate',
        Type: 'DateTime',
      },
      {
        Key: 'WFEndDate',
        SPList: 'WFEndDate',
        CDSTable: 'wfenddate',
        Type: 'DateTime',
      },
      {
        Key: 'FlowCategory',
        SPList: 'FlowCategory',
        CDSTable: 'flowcategory',
        Type: 'Number',
      },
      {
        Key: 'IsOldTask',
        SPList: 'IsOldTask',
        CDSTable: 'isoldtask',
        Type: 'Boolean',
      },
      {
        Key: 'Invalid',
        SPList: 'Invalid',
        CDSTable: 'invalid',
        Type: 'Boolean',
      },
    ],
    UserExpand: ['WFAssignedTo', 'Requester'],
  },
  WFApplicationRecord: {
    SPList: 'WFApplicationRecord',
    CDSTable: 'wfapplicationrecords',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFApplicant',
        SPList: 'WFApplicant',
        CDSTable: 'wfapplicant',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'WFApplicantTime',
        SPList: 'WFApplicantTime',
        CDSTable: 'wfapplicanttime',
        Type: 'DateTime',
      },
      {
        Key: 'WFStatus',
        SPList: 'WFStatus',
        CDSTable: 'wfstatus',
        Type: 'Text',
      },
      { Key: 'WFStep', SPList: 'WFStep', CDSTable: 'wfstep', Type: 'Number' },
      {
        Key: 'WFFormStatus',
        SPList: 'WFFormStatus',
        CDSTable: 'wfformstatus',
        Type: 'Choice',
      },
      {
        Key: 'WFPendingApprover',
        SPList: 'WFPendingApprover',
        CDSTable: 'wfpendingapprover',
        Type: 'Text',
      },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'WFRemark',
        SPList: 'WFRemark',
        CDSTable: 'wfremark',
        Type: 'Multiline Text',
      },
      {
        Key: 'WFDispFormUrl',
        SPList: 'WFDispFormUrl',
        CDSTable: 'wfdispformurl',
        Type: 'Text',
      },
      {
        Key: 'WFEditFormUrl',
        SPList: 'WFEditFormUrl',
        CDSTable: 'wfeditformurl',
        Type: 'Text',
      },
      {
        Key: 'ProcessInstance',
        SPList: 'ProcessInstance',
        CDSTable: 'processinstance',
        Type: 'Text',
      },
      {
        Key: 'ProcessId',
        SPList: 'ProcessId',
        CDSTable: 'processid',
        Type: 'Text',
      },
      { Key: 'Flag', SPList: 'Flag', CDSTable: 'flag', Type: 'Boolean' },
      // { Key: 'Created', SPList: 'Created', CDSTable: 'createon', Type: 'Date' },
    ],
    UserExpand: ['WFApplicant'],
  },
  WFAdditionalApproval: {
    SPList: 'WFAdditionalApproval',
    CDSTable: 'wfadditionalapprovals',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'Approver',
        SPList: 'Approver',
        CDSTable: 'approver',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'ApproverPrincipalName',
        SPList: 'ApproverPrincipalName',
        CDSTable: 'approverprincipalname',
        Type: 'Text',
      },
      {
        Key: 'IsApplied',
        SPList: 'IsApplied',
        CDSTable: 'isapplied',
        Type: 'Number',
      },
      {
        Key: 'AddType',
        SPList: 'AddType',
        CDSTable: 'addtype',
        Type: 'Number',
      },
      {
        Key: 'ApprovalID',
        SPList: 'ApprovalID',
        CDSTable: 'approvalid',
        Type: 'Text',
      },
    ],
    UserExpand: ['Approver'],
  },
  AppCategory: {
    SPList: 'AppCategory',
    CDSTable: 'appcategories',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      {
        Key: 'BusinessName',
        SPList: 'BusinessName',
        CDSTable: 'businessname',
        Type: 'Text',
      },
    ],
  },
  BusinessCategory: {
    SPList: 'BusinessCategory',
    CDSTable: 'businesscategories',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      { Key: 'Index', SPList: 'Index', CDSTable: 'index', Type: 'Number' },
      {
        Key: 'Description',
        SPList: 'Description',
        CDSTable: 'description',
        Type: 'Multiline Text',
      },
    ],
  },
  WorkflowCategory: {
    SPList: 'WorkflowCategory',
    CDSTable: 'workflowcategories',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      {
        Key: 'BusinessName',
        SPList: 'BusinessName',
        CDSTable: 'businessname',
        Type: 'Number',
      },
      {
        Key: 'AppName',
        SPList: 'AppName',
        CDSTable: 'appname',
        Type: 'Number',
      },
      {
        Key: 'FormType',
        SPList: 'FormType',
        CDSTable: 'formtype',
        Type: 'Text',
      },
      {
        Key: 'FormAddress',
        SPList: 'FormAddress',
        CDSTable: 'formaddress',
        Type: 'Text',
      },
      {
        Key: 'StoreAddress',
        SPList: 'StoreAddress',
        CDSTable: 'storeaddress',
        Type: 'Text',
      },
      {
        Key: 'WFHistoryAddress',
        SPList: 'WFHistoryAddress',
        CDSTable: 'wfhistoryaddress',
        Type: 'Text',
      },
      {
        Key: 'OpenFlowDesign',
        SPList: 'OpenFlowDesign',
        CDSTable: 'openflowdesign',
        Type: 'Boolean',
      },
      { Key: 'Index', SPList: 'Index', CDSTable: 'index', Type: 'Number' },
      {
        Key: 'Administrator',
        SPList: 'Administrator',
        CDSTable: 'administrator',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'WFDescription',
        SPList: 'WFDescription',
        CDSTable: 'wfdescription',
        Type: 'Multiline Text',
      },
      {
        Key: 'icon',
        SPList: 'WFIcon',
        CDSTable: 'icon',
        Type: 'Image',
        imgColumn: {
          SPList: 'WFIcon',
          CDSTable: 'icon',
        },
      },
    ],
    UserExpand: ['Administrator'],
  },
  GlobalTranslate: {
    SPList: 'GlobalTranslate',
    CDSTable: 'globaltranslates',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      { Key: 'ZH', SPList: 'ZH', CDSTable: 'zh', Type: 'Text' },
      { Key: 'ZHTW', SPList: 'ZHTW', CDSTable: 'zhtw', Type: 'Number' },
      { Key: 'EN', SPList: 'EN', CDSTable: 'en', Type: 'Number' },
      { Key: 'JP', SPList: 'JP', CDSTable: 'jp', Type: 'Text' },
      { Key: 'DE', SPList: 'DE', CDSTable: 'de', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      {
        Key: 'IsInitialize',
        SPList: 'IsInitialize',
        CDSTable: 'isinitialize',
        Type: 'Boolean',
      },
    ],
  },
  OrganizationUnit: {
    SPList: 'OrganizationUnit',
    CDSTable: 'organizationunits',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      {
        Key: 'OrgUnitType',
        SPList: 'OrgUnitType',
        CDSTable: 'orgunittype',
        Type: 'Text',
      },
      { Key: 'Code', SPList: 'Code', CDSTable: 'code', Type: 'Text' },
      {
        Key: 'ParentOrgUnit',
        SPList: 'ParentOrgUnit',
        CDSTable: 'parentorgunit',
        Type: 'Text',
      },
      {
        Key: 'OpenCustomOrg',
        SPList: 'OpenCustomOrg',
        CDSTable: 'opencustomorg',
        Type: 'Text',
      },
      { Key: 'Related', SPList: 'Related', CDSTable: 'related', Type: 'Text' },
    ],
  },
  UserPosition: {
    SPList: 'UserPosition',
    CDSTable: 'userpositions',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      {
        Key: 'WFParentId',
        SPList: 'WFParentId',
        CDSTable: 'wfparentid',
        Type: 'Number',
      },
    ],
  },
  UserInformation: {
    SPList: 'UserInformation',
    CDSTable: 'userinformations',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'Employee',
        SPList: 'Employee',
        CDSTable: 'employee',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress', 'domainname'],
          // fullname,domainname,systemuserid,windowsliveid,internalemailaddress,address1_telephone1
        },
      },
      {
        Key: 'PrincipalName',
        SPList: 'PrincipalName',
        CDSTable: 'principalname',
        Type: 'Text',
      },
      { Key: 'OrgUnit', SPList: 'OrgUnit', CDSTable: 'orgunit', Type: 'Text' },
      {
        Key: 'PositionName',
        SPList: 'PositionName',
        CDSTable: 'positionname',
        Type: 'Number',
      },
      {
        Key: 'LevelName',
        SPList: 'LevelName',
        CDSTable: 'levelname',
        Type: 'Number',
      },
      {
        Key: 'WorkEmail',
        SPList: 'WorkEmail',
        CDSTable: 'workemail',
        Type: 'Text',
      },
      {
        Key: 'WFCellPhone',
        SPList: 'WFCellPhone',
        CDSTable: 'wfcellphone',
        Type: 'Text',
      },
      {
        Key: 'Birthday',
        SPList: 'Birthday',
        CDSTable: 'birthday',
        Type: 'DateTime',
      },
      {
        Key: 'Gender',
        SPList: 'Gender',
        CDSTable: 'gender',
        Type: 'Choice',
        mapValue: [
          { Key: 'Male', SPList: 'Male', CDSTable: '993670000' },
          { Key: 'Female', SPList: 'Female', CDSTable: '993670001' },
        ],
      },
      {
        Key: 'HireDate',
        SPList: 'HireDate',
        CDSTable: 'hiredate',
        Type: 'DateTime',
      },
      {
        Key: 'LeaveDate',
        SPList: 'LeaveDate',
        CDSTable: 'leavedate',
        Type: 'DateTime',
      },
      {
        Key: 'Manager',
        SPList: 'Manager',
        CDSTable: 'manager',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname'],
        },
      },
      {
        Key: 'Avatar',
        SPList: 'Avatar',
        CDSTable: 'avatar',
        Type: 'Image',
        imgColumn: {
          SPList: 'Avatar',
          CDSTable: 'avatar',
        },
      },
      {
        Key: 'ManagerPrincipalName',
        SPList: 'ManagerPrincipalName',
        CDSTable: 'managerprincipalname',
        Type: 'Text',
      },
    ],
    UserExpand: ['Employee', 'Manager'],
  },
  UserSupport: {
    SPList: 'employeesupportinformations',
    CDSTable: 'employeesupportinformations',
    Fields: [
      // { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      {
        Key: 'accountname',
        SPList: 'accountname',
        CDSTable: 'accountname',
        Type: 'Text',
      },
      {
        Key: 'parentsbirthday',
        SPList: 'parentsbirthday',
        CDSTable: 'parentsbirthday',
        Type: 'Date',
      },
      {
        Key: 'parentsbirthdaycertificate_name',
        SPList: 'parentsbirthdaycertificate_name',
        CDSTable: 'parentsbirthdaycertificate_name',
        Type: 'Text',
      },
      {
        Key: 'parentsbirthdaycertificate',
        SPList: 'parentsbirthdaycertificate',
        CDSTable: 'parentsbirthdaycertificate',
        Type: 'File',
      },
      {
        Key: 'recordstatus',
        SPList: 'recordstatus',
        CDSTable: 'recordstatus',
        Type: 'Text',
      },
      {
        Key: 'lastmodifiedby',
        SPList: 'lastmodifiedby',
        CDSTable: 'lastmodifiedby',
        Type: 'Text',
      },
      {
        Key: 'lastmodified',
        SPList: 'lastmodified',
        CDSTable: 'lastmodified',
        Type: 'DateTime',
      },
      {
        Key: 'employeesupportinformationid',
        SPList: 'employeesupportinformationid',
        CDSTable: 'employeesupportinformationid',
        Type: 'Text',
      },
      {
        Key: 'relationship',
        SPList: 'relationship',
        CDSTable: 'relationship',
        Type: 'Text',
      },
    ],
  },
  UserChild: {
    SPList: 'employeechildinformations',
    CDSTable: 'employeechildinformations',
    Fields: [
      // { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      {
        Key: 'accountname',
        SPList: 'accountname',
        CDSTable: 'accountname',
        Type: 'Text',
      },
      {
        Key: 'childsbirthcertificate_name',
        SPList: 'childsbirthcertificate_name',
        CDSTable: 'childsbirthcertificate_name',
        Type: 'Text',
      },
      {
        Key: 'createBy',
        SPList: 'createBy',
        CDSTable: 'createBy',
        Type: 'Text',
      },
      {
        Key: 'numberofchildren',
        SPList: 'numberofchildren',
        CDSTable: 'numberofchildren',
        Type: 'Int',
      },
      {
        Key: 'expecteddate',
        SPList: 'expecteddate',
        CDSTable: 'expecteddate',
        Type: 'Date',
      },
      {
        Key: 'childsbirthcertificate',
        SPList: 'childsbirthcertificate',
        CDSTable: 'childsbirthcertificate',
        Type: 'File',
      },
      {
        Key: 'recordstatus',
        SPList: 'recordstatus',
        CDSTable: 'recordstatus',
        Type: 'Text',
      },
      {
        Key: 'lastmodifiedby',
        SPList: 'lastmodifiedby',
        CDSTable: 'lastmodifiedby',
        Type: 'Text',
      },
      {
        Key: 'lastmodified',
        SPList: 'lastmodified',
        CDSTable: 'lastmodified',
        Type: 'DateTime',
      },
      {
        Key: 'employeechildinformationid',
        SPList: 'employeechildinformationid',
        CDSTable: 'employeechildinformationid',
        Type: 'Text',
      },
      {
        Key: 'modifiedon',
        SPList: 'modifiedon',
        CDSTable: 'modifiedon',
        Type: 'DateTime',
      },
    ],
  },
  UserManager: {
    SPList: 'employeeinformations',
    CDSTable: 'employeeinformations',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      {
        Key: 'employeeinformationid',
        SPList: 'employeeinformationid',
        CDSTable: 'employeeinformationid',
        Type: 'Text',
      },
      {
        Key: 'accountname',
        SPList: 'accountname',
        CDSTable: 'accountname',
        Type: 'Text',
      },
      {
        Key: 'onboardingdate',
        SPList: 'onboardingdate',
        CDSTable: 'onboardingdate',
        Type: 'Date',
      },
      { Key: 'name', SPList: 'name', CDSTable: 'name', Type: 'Text' },
      {
        Key: 'gender',
        SPList: 'gender',
        CDSTable: 'gender',
        Type: 'Text',
      },
      {
        Key: 'birthday',
        SPList: 'birthday',
        CDSTable: 'birthday',
        Type: 'DateTime',
      },
      {
        Key: 'isadmin',
        SPList: 'isadmin',
        CDSTable: 'isadmin',
        Type: 'Choice',
      },
      { Key: 'IsHRBP', SPList: 'IsHRBP', CDSTable: 'ishrbp', Type: 'Choice' },
      {
        Key: 'IsHRDirector',
        SPList: 'IsHRDirector',
        CDSTable: 'ishrdirector',
        Type: 'Choice',
      },
      {
        Key: 'maritalstatus',
        SPList: 'maritalstatus',
        CDSTable: 'maritalstatus',
        Type: 'Choice',
      },
      { Key: 'leader', SPList: 'leader', CDSTable: 'leader', Type: 'Text' },
      {
        Key: 'startdateofwork',
        SPList: 'startdateofwork',
        CDSTable: 'startdateofwork',
        Type: 'DateTime',
      },
      {
        Key: 'officialdate',
        SPList: 'officialdate',
        CDSTable: 'officialdate',
        Type: 'DateTime',
      },
      { Key: 'area', SPList: 'area', CDSTable: 'area', Type: 'Text' },
      { Key: 'dept', SPList: 'dept', CDSTable: 'dept', Type: 'Text' },
      { Key: 'jobtype', SPList: 'jobtype', CDSTable: 'jobtype', Type: 'Text' },
      {
        Key: 'positionlevel',
        SPList: 'positionlevel',
        CDSTable: 'positionlevel',
        Type: 'Text',
      },
      {
        Key: 'functionalleader',
        SPList: 'functionalleader',
        CDSTable: 'functionalleader',
        Type: 'Text',
      },
      {
        Key: 'recordstatus',
        SPList: 'recordstatus',
        CDSTable: 'recordstatus',
        Type: 'Text',
      },
      {
        Key: 'modifiedby',
        SPList: 'modifiedby',
        CDSTable: 'modifiedby',
        Type: 'Text',
      },
      {
        Key: 'modifiedon',
        SPList: 'modifiedon',
        CDSTable: 'modifiedon',
        Type: 'DateTime',
      },
    ],
  },
  UserLevel: {
    SPList: 'UserLevel',
    CDSTable: 'userlevels',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'GlobalKey',
        SPList: 'GlobalKey',
        CDSTable: 'globalkey',
        Type: 'Text',
      },
      {
        Key: 'LevelId',
        SPList: 'LevelId',
        CDSTable: 'levelid',
        Type: 'Number',
      },
    ],
  },
  CriticalPath: {
    SPList: 'CriticalPath',
    CDSTable: 'criticalpaths',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFDescription',
        SPList: 'WFDescription',
        CDSTable: 'wfdescription',
        Type: 'Multiline Text',
      },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'ActionType',
        SPList: 'ActionType',
        CDSTable: 'actiontype',
        Type: 'Text',
      },
      {
        Key: 'FilterRule',
        SPList: 'FilterRule',
        CDSTable: 'filterrule',
        Type: 'Text',
      },
      { Key: 'WFStep', SPList: 'WFStep', CDSTable: 'wfstep', Type: 'Number' },
      { Key: 'WFBack', SPList: 'WFBack', CDSTable: 'wfback', Type: 'Number' },
      { Key: 'WFNext', SPList: 'WFNext', CDSTable: 'wfnext', Type: 'Number' },
      {
        Key: 'TaskModel',
        SPList: 'TaskModel',
        CDSTable: 'taskmodel',
        Type: 'Text',
      },
      {
        Key: 'CheckCurUser',
        SPList: 'CheckCurUser',
        CDSTable: 'checkcuruser',
        Type: 'Boolean',
      },
      {
        Key: 'FormField',
        SPList: 'FormField',
        CDSTable: 'formfield',
        Type: 'Text',
      },
      {
        Key: 'OrgUnitName',
        SPList: 'OrgUnitName',
        CDSTable: 'orgunitname',
        Type: 'Text',
      },
      {
        Key: 'WFDepartment',
        SPList: 'WFDepartment',
        CDSTable: 'wfdepartment',
        Type: 'Text',
      },
      { Key: 'Role', SPList: 'Role', CDSTable: 'role', Type: 'Text' },
      {
        Key: 'LMFlowName',
        SPList: 'LMFlowName',
        CDSTable: 'lmflowname',
        Type: 'Text',
      },
      {
        Key: 'ApprovalUsers',
        SPList: 'ApprovalUsers',
        CDSTable: 'approvalusers',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname'],
        },
      },
      {
        Key: 'ApprovalPrincipalName',
        SPList: 'ApprovalPrincipalName',
        CDSTable: 'approvalprincipalname',
        Type: 'Text',
      },
      {
        Key: 'TaskResponse',
        SPList: 'TaskResponse',
        CDSTable: 'taskresponse',
        Type: 'Text',
      },
      {
        Key: 'BatchName',
        SPList: 'BatchName',
        CDSTable: 'batchname',
        Type: 'Text',
      },
      {
        Key: 'CSOutcome',
        SPList: 'CSOutcome',
        CDSTable: 'csoutcome',
        Type: 'Choice',
      },
      {
        Key: 'DupCheck',
        SPList: 'DupCheck',
        CDSTable: 'dupcheck',
        Type: 'Boolean',
      },
      {
        Key: 'TaskForm',
        SPList: 'TaskForm',
        CDSTable: 'taskform',
        Type: 'Text',
      },
      {
        Key: 'AllowAttachment',
        SPList: 'AllowAttachment',
        CDSTable: 'allowattachment',
        Type: 'Boolean',
      },
      {
        Key: 'MailTemplate',
        SPList: 'MailTemplate',
        CDSTable: 'mailtemplate',
        Type: 'Number',
      },
      {
        Key: 'WFDueDate',
        SPList: 'WFDueDate',
        CDSTable: 'wfduedate',
        Type: 'Number',
      },
      {
        Key: 'DueMail',
        SPList: 'DueMail',
        CDSTable: 'duemail',
        Type: 'Number',
      },
      {
        Key: 'CannelMail',
        SPList: 'CannelMail',
        CDSTable: 'cancelmail',
        Type: 'Number',
      },
      {
        Key: 'LoopForLM',
        SPList: 'LoopForLM',
        CDSTable: 'loopforlm',
        Type: 'Boolean',
      },
      {
        Key: 'StopLoop',
        SPList: 'StopLoop',
        CDSTable: 'stoploop',
        Type: 'Choice',
      },
      {
        Key: 'JobLevel',
        SPList: 'JobLevel',
        CDSTable: 'joblevel',
        Type: 'Number',
      },
      {
        Key: 'AmountList',
        SPList: 'AmountList',
        CDSTable: 'amountlist',
        Type: 'Text',
      },
      {
        Key: 'AmountField',
        SPList: 'AmountField',
        CDSTable: 'amountfield',
        Type: 'Text',
      },
      { Key: 'Btn', SPList: 'Btn', CDSTable: 'btn', Type: 'Text' },
    ],
    UserExpand: ['ApprovalUsers'],
  },
  WFMailTemplate: {
    SPList: 'WFMailTemplate',
    CDSTable: 'wfmailtemplates',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'MailType',
        SPList: 'MailType',
        CDSTable: 'mailtype',
        Type: 'Text',
      },
      { Key: 'Subject', SPList: 'Subject', CDSTable: 'subject', Type: 'Text' },
      {
        Key: 'WFBody',
        SPList: 'WFBody',
        CDSTable: 'wfbody',
        Type: 'Multiline Text',
      },
      { Key: 'To', SPList: 'To', CDSTable: 'to', Type: 'Text' },
      { Key: 'CC', SPList: 'CC', CDSTable: 'cc', Type: 'Text' },
      {
        Key: 'WFRemark',
        SPList: 'WFRemark',
        CDSTable: 'wfremark',
        Type: 'Multiline Text',
      },
    ],
  },
  FormatRules: {
    SPList: 'FormatRules',
    CDSTable: 'formatruleses',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'IsSNFirst',
        SPList: 'IsSNFirst',
        CDSTable: 'issnfirst',
        Type: 'Boolean',
      },
      {
        Key: 'SplitLeftChar',
        SPList: 'SplitLeftChar',
        CDSTable: 'splitleftchar',
        Type: 'Text',
      },
      {
        Key: 'SplitRightChar',
        SPList: 'SplitRightChar',
        CDSTable: 'splitrightchar',
        Type: 'Text',
      },
      {
        Key: 'ChangeDate',
        SPList: 'ChangeDate',
        CDSTable: 'changedate',
        Type: 'DateTime',
      },
    ],
  },
  MailSendingRecords: {
    SPList: 'MailSendingRecords',
    CDSTable: 'mailsendingrecordses',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      { Key: 'MailTo', SPList: 'MailTo', CDSTable: 'mailto', Type: 'Boolean' },
      {
        Key: 'MailSubject',
        SPList: 'MailSubject',
        CDSTable: 'mailsubject',
        Type: 'Text',
      },
      {
        Key: 'MailBody',
        SPList: 'MailBody',
        CDSTable: 'mailbody',
        Type: 'Multiline Text',
      },
      {
        Key: 'SendStatus',
        SPList: 'SendStatus',
        CDSTable: 'sendstatus',
        Type: 'Boolean',
      },
      {
        Key: 'SendTime',
        SPList: 'SendTime',
        CDSTable: 'sendtime',
        Type: 'DateTime',
      },
      { Key: 'SN', SPList: 'SN', CDSTable: 'sn', Type: 'Text' },
    ],
  },
  //自定义
  TestApplication: {
    SPList: 'TestApplication',
    CDSTable: 'testapplications',
    Fields: [
      { Key: 'Key', SPList: 'Id', CDSTable: 'testapplicationid', Type: 'Text' },
      { Key: 'SN', SPList: 'SN', CDSTable: 'sn', Type: 'Text' },
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Brand', SPList: 'Brand', CDSTable: 'brand', Type: 'Text' },
      {
        Key: 'Comments',
        SPList: 'Comments',
        CDSTable: 'comments',
        Type: 'Text',
      },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFApplicant',
        SPList: 'WFApplicant',
        CDSTable: 'wfapplicant',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress', 'systemuserid'],
        },
      },
      {
        Key: 'WFApplicantTime',
        SPList: 'WFApplicantTime',
        CDSTable: 'wfapplicanttime',
        Type: 'DateTime',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFormStatus',
        SPList: 'WFFormStatus',
        CDSTable: 'wfformstatus',
        Type: 'Text',
      },
      {
        Key: 'WFPendingApprover',
        SPList: 'WFPendingApprover',
        CDSTable: 'wfpendingapprover',
        Type: 'Text',
      },
      {
        Key: 'WFRemark',
        SPList: 'WFRemark',
        CDSTable: 'wfremark',
        Type: 'Text',
      },
      {
        Key: 'WFStatus',
        SPList: 'WFStatus',
        CDSTable: 'wfstatus',
        Type: 'Text',
      },
      { Key: 'WFStep', SPList: 'WFStep', CDSTable: 'wfstep', Type: 'Number' },
      {
        Key: 'ApplicationUser',
        SPList: 'ApplicationUser',
        CDSTable: 'applicationuser',
        Type: 'Text',
      },
      {
        Key: 'LineManagerMail',
        SPList: 'LineManagerMail',
        CDSTable: 'linemanagermail',
        Type: 'Text',
      },
      {
        Key: 'ReviewerMail',
        SPList: 'ReviewerMail',
        CDSTable: 'reviewermail',
        Type: 'Text',
      },
      { Key: 'Area', SPList: 'Area', CDSTable: 'area', Type: 'Text' },
      {
        Key: 'OfficialSeal',
        SPList: 'OfficialSeal',
        CDSTable: 'officialseal',
        Type: 'Text Area',
      },
      {
        Key: 'ApplicationSealType',
        SPList: 'ApplicationSealType',
        CDSTable: 'applicationsealtype',
        Type: 'Choices',
      },
      {
        Key: 'Involved',
        SPList: 'Involved',
        CDSTable: 'involved',
        Type: 'Choice',
      },
      {
        Key: 'OrderNumber',
        SPList: 'OrderNumber',
        CDSTable: 'ordernumber',
        Type: 'Number',
      },
      {
        Key: 'OrderAmount',
        SPList: 'OrderAmount',
        CDSTable: 'orderamount',
        Type: 'Text',
      },
      {
        Key: 'Currency',
        SPList: 'Currency',
        CDSTable: 'currency',
        Type: 'Text',
      },
      {
        Key: 'Payment',
        SPList: 'Payment',
        CDSTable: 'payment',
        Type: 'Choice',
      },
      {
        Key: 'Takeaway',
        SPList: 'Takeaway',
        CDSTable: 'takeaway',
        Type: 'Choice',
      },
      {
        Key: 'AttachedFileName',
        SPList: 'AttachedFileName',
        CDSTable: 'attachedfilename',
        Type: 'Text',
      },
      { Key: 'Explain', SPList: 'Explain', CDSTable: 'explain', Type: 'Text' },
      {
        Key: 'Enclosure',
        SPList: 'Enclosure',
        CDSTable: 'enclosure',
        Type: 'File',
      },
      {
        Key: 'Enclosure_name',
        SPList: 'Enclosure_name',
        CDSTable: 'enclosure_name',
        Type: 'Text',
      },
    ],
    UserExpand: ['WFApplicant'],
  },
  Manage: {
    SPList: 'Manage',
    CDSTable: 'manages',
    Fields: [
      {
        Key: 'LineManager',
        SPList: 'LineManager',
        CDSTable: 'linemanager',
        Type: 'Text',
      },
      {
        Key: 'Reviewer',
        SPList: 'Reviewer',
        CDSTable: 'reviewer',
        Type: 'Text',
      },
      { Key: 'User1', SPList: 'User1', CDSTable: 'user1', Type: 'Text' },
      { Key: 'User2', SPList: 'User2', CDSTable: 'user2', Type: 'Text' },
      {
        Key: 'manageid',
        SPList: 'manageid',
        CDSTable: 'manageid',
        Type: 'Text',
      },
    ],
  },
  LRMainItems: {
    SPList: 'LRMainItems',
    CDSTable: 'LRMainItems',
    Fields: [
      {
        Key: 'Key',
        SPList: 'Id',
        CDSTable: 'leaveapplicationid',
        Type: 'Text',
      },
      { Key: 'SN', SPList: 'SN', CDSTable: 'sn', Type: 'Text' },
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Brand', SPList: 'Brand', CDSTable: 'brand', Type: 'Text' },
      {
        Key: 'Comments',
        SPList: 'Comments',
        CDSTable: 'comments',
        Type: 'Text',
      },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFApplicant',
        SPList: 'WFApplicant',
        CDSTable: 'wfapplicant',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress', 'systemuserid'],
        },
      },
      {
        Key: 'WFApplicantTime',
        SPList: 'WFApplicantTime',
        CDSTable: 'wfapplicanttime',
        Type: 'DateTime',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFormStatus',
        SPList: 'WFFormStatus',
        CDSTable: 'wfformstatus',
        Type: 'Text',
      },
      {
        Key: 'WFPendingApprover',
        SPList: 'WFPendingApprover',
        CDSTable: 'wfpendingapprover',
        Type: 'Text',
      },
      {
        Key: 'WFRemark',
        SPList: 'WFRemark',
        CDSTable: 'wfremark',
        Type: 'Text',
      },
      {
        Key: 'WFStatus',
        SPList: 'WFStatus',
        CDSTable: 'wfstatus',
        Type: 'Text',
      },
      { Key: 'WFStep', SPList: 'WFStep', CDSTable: 'wfstep', Type: 'Number' },
      {
        Key: 'LeaveType',
        SPList: 'LeaveType',
        CDSTable: 'leavetype',
        Type: 'Text',
      },
    ],
    UserExpand: ['WFApplicant'],
  },
  WorkflowTasks: {
    SPList: 'Workflow Tasks',
    CDSTable: 'WorkflowTasks',
    Fields: [
      { Key: 'Title', SPList: 'Title', CDSTable: 'Title', Type: 'Text' },
      {
        Key: 'StartDate',
        SPList: 'StartDate',
        CDSTable: 'StartDate',
        Type: 'DateTime',
      },
      {
        Key: 'DueDate',
        SPList: 'DueDate',
        CDSTable: 'DueDate',
        Type: 'DateTime',
      },
      {
        Key: 'AssignedTo',
        SPList: 'AssignedTo',
        CDSTable: 'AssignedTo',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress', 'systemuserid'],
        },
      },
      {
        Key: 'PercentComplete',
        SPList: 'PercentComplete',
        CDSTable: 'PercentComplete',
        Type: 'Number',
      },
      { Key: 'Status', SPList: 'Status', CDSTable: 'Status', Type: 'Text' },
      { Key: 'Result', SPList: 'Result', CDSTable: 'Result', Type: 'Text' },
      {
        Key: 'ItemLink',
        SPList: 'ItemLink',
        CDSTable: 'ItemLink',
        Type: 'Text',
      },
      {
        Key: 'CompletedOn',
        SPList: 'CompletedOn',
        CDSTable: 'CompletedOn',
        Type: 'DateTime',
      },
      {
        Key: 'ResponseOptions',
        SPList: 'ResponseOptions',
        CDSTable: 'ResponseOptions',
        Type: 'DateTime',
      },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'WFFlowName',
        Type: 'Text',
      },
      {
        Key: 'ContentTypeId',
        SPList: 'ContentTypeId',
        CDSTable: 'ContentTypeId',
        Type: 'Text',
      },
    ],
    UserExpand: ['WFApplicant'],
  },
  WFHistory: {
    SPList: 'WFHistory',
    CDSTable: 'wfhistories',
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'TaskName',
        SPList: 'TaskName',
        CDSTable: 'taskname',
        Type: 'Text',
      },
      {
        Key: 'PrincipalName',
        SPList: 'PrincipalName',
        CDSTable: 'principalname',
        Type: 'Text',
      },
      {
        Key: 'Responder',
        SPList: 'Responder',
        CDSTable: 'responder',
        Type: 'Text',
      },
      {
        Key: 'Operation',
        SPList: 'Operation',
        CDSTable: 'operation',
        Type: 'Text',
      },
      {
        Key: 'WFComments',
        SPList: 'WFComments',
        CDSTable: 'wfcomments',
        Type: 'Multiline Text',
      },
      {
        Key: 'OperateTime',
        SPList: 'OperateTime',
        CDSTable: 'operatetime',
        Type: 'DateTime',
      },
      {
        Key: 'TaskCreated',
        SPList: 'TaskCreated',
        CDSTable: 'taskcreated',
        Type: 'DateTime',
      },
      {
        Key: 'IsLatest',
        SPList: 'IsLatest',
        CDSTable: 'islatest',
        Type: 'Number',
      },
      {
        Key: 'Handler',
        SPList: 'Handler',
        CDSTable: 'handler',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
    ],
    UserExpand: ['Handler'],
  },
  Others: {
    Fields: [
      { Key: 'Id', SPList: 'ID', CDSTable: 'id', Type: 'Int' },
      { Key: 'Title', SPList: 'Title', CDSTable: 'title', Type: 'Text' },
      {
        Key: 'WFApplicant',
        SPList: 'WFApplicant',
        CDSTable: 'wfapplicant',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'WFApplicantTime',
        SPList: 'WFApplicantTime',
        CDSTable: 'wfapplicanttime',
        Type: 'DateTime',
      },
      {
        Key: 'WFStatus',
        SPList: 'WFStatus',
        CDSTable: 'wfstatus',
        Type: 'Text',
      },
      { Key: 'WFStep', SPList: 'WFStep', CDSTable: 'wfstep', Type: 'Number' },
      {
        Key: 'WFFormStatus',
        SPList: 'WFFormStatus',
        CDSTable: 'wfformstatus',
        Type: 'Text',
      },
      {
        Key: 'WFPendingApprover',
        SPList: 'WFPendingApprover',
        CDSTable: 'wfpendingapprover',
        Type: 'Text',
      },
      {
        Key: 'WFFlowName',
        SPList: 'WFFlowName',
        CDSTable: 'wfflowname',
        Type: 'Text',
      },
      {
        Key: 'WFFlowKey',
        SPList: 'WFFlowKey',
        CDSTable: 'wfflowkey',
        Type: 'Text',
      },
      {
        Key: 'WFRemark',
        SPList: 'WFRemark',
        CDSTable: 'wfremark',
        Type: 'Multiline Text',
      },
      {
        Key: 'LineManager',
        SPList: 'LineManager',
        CDSTable: 'linemanager',
        Type: 'User',
        expandProperties: {
          SPList: ['Title'],
          CDSTable: ['fullname', 'internalemailaddress'],
        },
      },
      {
        Key: 'StartDate',
        SPList: 'StartDate',
        CDSTable: 'startdate',
        Type: 'DateTime',
      },
      {
        Key: 'EndDate',
        SPList: 'EndDate',
        CDSTable: 'enddate',
        Type: 'DateTime',
      },
    ],
    UserExpand: ['WFApplicant', 'LineManager'],
  },
};

const TableTypeExpandMap: any = {
  User: [
    { Key: 'Title', SPList: 'Title', CDSTable: 'fullname', Type: 'Text' },
    { Key: 'Value', SPList: 'Value', CDSTable: 'domainname', Type: 'Text' },
    {
      Key: 'Email',
      SPList: 'Id',
      CDSTable: 'internalemailaddress',
      Type: 'Text',
    },
    {
      Key: 'Phone',
      SPList: 'WFCellPhone',
      CDSTable: 'address1_telephone1',
      Type: 'Text',
    },
    { Key: 'key', SPList: 'Id', CDSTable: 'systemuserid', Type: 'Text' },
  ],
};

const TableKeyMap: any = {
  SPList: () => 'Id',
  CDSTable: (listName: string) => `${listName.toLowerCase()}id`,
};

// table
export const formatColumn = (
  type: any,
  listName: string | number,
  column: string,
) => {
  return TableTypeMap[listName].Fields.find(
    (e: { [x: string]: any }) => e[type] === column,
  );
};
export const formatColumnByKey = (
  listName: string | number,
  column: string,
) => {
  return TableTypeMap[listName].Fields.find(
    (e: { [x: string]: any }) => e['Key'] === column,
  );
};

export const formatTable = (listName: string | number) => {
  return TableTypeMap[listName];
};

export const transformColumn = (type: string, value: any) => {
  if (type === 'DateTime') {
    return Util.formatDateString(value, false, 'YYYY-MM-DD HH:mm');
  }
};

export const getImageColumn = (listName: string | number) => {
  return TableTypeMap[listName].Fields.find(
    (e: { [x: string]: string }) => e['Type'] === 'Image',
  );
};

export const getFileColumn = (listName: string | number) => {
  return TableTypeMap[listName].Fields.find(
    (e: { [x: string]: string }) => e['Type'] === 'File',
  );
};

export const getFileColumns = (listName: string | number) => {
  return TableTypeMap[listName].Fields.filter(
    (e: { [x: string]: string }) => e['Type'] === 'File',
  );
};

// others
export const formatKey = (type: string, listName: string) => {
  return TableKeyMap[type](listName);
};

export const formatExpandKey = (type: string) => {
  return TableTypeExpandMap[type];
};
