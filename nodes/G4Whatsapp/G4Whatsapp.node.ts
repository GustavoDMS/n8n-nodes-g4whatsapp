import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { OptionsWithUri } from 'request-promise-native';
export class G4Whatsapp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'G4 WhatsApp API',
		name: 'g4whatsapp',
		icon: 'file:G4Whatsapp.svg',


		version: 0,
		defaults: {
			name: 'G4 WhatsApp',
		},
		inputs: ['main'],
		outputs: ['main'],
		group: [],
		description: '',
		credentials: [
			{
				name: 'g4whatsappapi',
				required: true,
			},
		],
		// requestDefaults: {
        //     baseURL: 'http://127.0.0.1:3333',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // },
		properties: [

			{
				displayName: "To", // The value the user sees in the UI
				name: "id", // The name used to reference the element UI within the code
				type: "string",
				required: true, // Whether the field is required or not
				default: '999999999999999999',
				description: 'The contact number to send the message to',
			},
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Text Message',
						value: 'textMessage',
						routing: {
							request: {
								method: 'POST',
								url: '/message/text',
							},
						},
					},
					{
						name: 'Image Message',
						value: 'imageMessage',
					},
					{
						name: 'Video Message',
						value: 'videoMessage',
					},
					{
						name: 'Audio Message',
						value: 'audioMessage',
					},
					{
						name: 'Document Message',
						value: 'documentMessage',
					},
					{
						name: 'File URL',
						value: 'fileUrl',
					},
					{
						name: 'Button(Template) Message',
						value: 'templateMessage',
					},
					{
						name: 'Contact Message',
						value: 'contactMessage',
					},
					{
						name: 'List Message',
						value: 'listMessage',
					},
					{
						name: 'Button With Media',
						value: 'buttomWithMedia',
					},


				],
				default: 'textMessage',
			},
			{
				displayName: 'Text message',
				name: 'message',
				type: 'string',
				required: true,
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: '',
				
				displayOptions: {
					show: {
						messageType: [
							'textMessage',
						],
					},
				},
			},
		],
	}
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const returnData = [];
		const messageType = this.getNodeParameter('messageType', 0) as string;
		const id = this.getNodeParameter('id', 0) as string;
		//Get credentials the user provided for this node
		const credentials = await this.getCredentials('g4whatsappapi') as IDataObject;
	
		if (messageType === 'textMessage') {

		  const message = this.getNodeParameter('message', 0) as string;


		  const data: IDataObject = {
			id: id,
			message:message,
		  };
	
		  const options: OptionsWithUri = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: data,
			uri: `${credentials.api_url}/message/text?key=${credentials.key}`,
			
		  };
		  responseData = await this.helpers.request(options);
		  returnData.push(responseData);
		}
		// Map data to n8n data
		return [this.helpers.returnJsonArray(returnData)];
	  }
  }