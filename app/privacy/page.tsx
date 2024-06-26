import React from "react";
import "../../styles/editor.css";
import { Separator } from "@/components/ui/separator";
export default function PrivacyPage() {
  return (
    <div className="flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-center items-start gap-4 prose prose-invert">
        <h1>Strefa Gier Privacy Policy</h1>
        This Privacy Policy describes how Strefa Gier ("we," "us," or "our")
        collects, uses, and discloses your information when you use our website
        (the "Service").
        <h2>Information We Collect</h2>
        We collect several different types of information for various purposes
        to improve our Service to you.
        <ol>
          <li>
            <h3>Information You Provide Directly:</h3>
            <ul>
              <li>
                <p>
                  Username and email address when registering for an account
                  (used for identification and participation in discussions).
                </p>
              </li>
              <li>
                <p>
                  Basic profile information (name and email) from Google OAuth
                  login (based on your Google privacy settings).
                </p>
              </li>
            </ul>
          </li>
          <li>
            <h3>Information Collected Automatically:</h3>
            <ul>
              <li>
                <p>
                  Browser type, operating system, and content accessed (used for
                  internal analytics).
                </p>
              </li>
            </ul>
          </li>
          <li>
            <h3>Cookies and Similar Technologies:</h3>
            <ul>
              <li>
                <p>
                  Cookies are only used to hold certain information (improve the
                  Service).
                </p>
              </li>
            </ul>
          </li>
        </ol>
        <h2>Use of Your Information</h2>
        We use the information we collect to:
        <ul>
          <li>Identify you and allow participation in discussions.</li>
          <li>Send important information about the Service.</li>
          <li>Improve and personalize your experience.</li>
        </ul>
        <h2>Sharing of Your Information</h2>
        We do not share your personal information for third-party marketing.
        However, we may share in the following situations:
        <ul>
          <li>
            With service providers who help operate and maintain the Service.
          </li>
          <li>To comply with legal obligations or respond to legal process.</li>
          <li>
            To protect the rights and safety of Strefa Gier, users, or the
            public.
          </li>
        </ul>
        <h2>Data Retention</h2>
        <p>
          We retain your information for account activity, service provision,
          legal obligations, dispute resolution, and agreement enforcement.
        </p>
        <h2>Your Choices</h2>
        <p>
          You can access and update your information in your account settings.
          You can adjust browser settings to opt-out of certain cookies, but
          this may affect your interaction with the Service.
        </p>
        <h2>Children's Privacy</h2>
        <p>
          Our Service is not directed to children under 13. We do not knowingly
          collect personal information from children under 13. Please contact us
          if you are a parent or guardian and believe your child has provided us
          with personal information.
        </p>
        <h2>Security</h2>
        <p>
          We take reasonable steps to protect your information, but no internet
          transmission or electronic storage method is completely secure.
        </p>
        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update our Privacy Policy. We will notify you by posting the
          new Privacy Policy on this page.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          on discord: highlighted_.
        </p>
        <Separator className="my-4 " />
        <p className="flex justify-end items-end w-full">
          Effective Date: June 25, 2024
        </p>
      </div>
    </div>
  );
}
