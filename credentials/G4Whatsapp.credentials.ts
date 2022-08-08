import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class G4Whatsapp implements ICredentialType {
	name = 'g4whatsappapi';
	displayName = 'G4 WhatsApp API';
	//documentationUrl = '<your-docs-url>';
	properties: INodeProperties[] = [
		{
			displayName: 'API BASEURL',
			name: 'api_url',
			type: 'string',
			default: 'http://127.0.0.1:3333',
		},
		{
			displayName: 'INSTANCE KEY',
			name: 'key',
			type: 'string',
			default: 'YOUR_INSTANCE_KEY',
		},

	];
	authenticate = {
		type: 'generic',
		properties: {
			// Can be body, header, or qs
			qs: {
				// Use the value from `apiKey` above
				'key': '={{$credentials.key}}'
			}

		},
	} as IAuthenticateGeneric;
}