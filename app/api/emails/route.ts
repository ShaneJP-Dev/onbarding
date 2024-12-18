import { NextRequest, NextResponse } from 'next/server';
import Email from "@/app/emails/EmailButton";
import { Resend } from "resend";
import { CompanyRegistrationFormData } from '@/app/constants/types';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming JSON data
        const formData: CompanyRegistrationFormData = await request.json();

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'shanejpelser.dev@gmail.com',
            subject: 'Onboarding process Complete',
            react: Email(formData),
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}