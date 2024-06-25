import React from "react";
import "../../styles/editor.css";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="mb-6 flex flex-col justify-center items-start gap-4"
        id="editor"
      >
        <h1>Strefa Gier Privacy Policy</h1>

        <Label>
          This Privacy Policy describes how Strefa Gier ("we," "us," or "our")
          collects, uses, and discloses your information when you use our
          website (the "Service").
        </Label>

        <h2>Information We Collect</h2>
        <Label>
          We collect several different types of information for various purposes
          to improve our Service to you.
        </Label>
        <ul className=" list-disc">
          <li className="ml-6">
            <h3>Information You Provide Directly:</h3>
            <ul>
              <li className="ml-6">
                <Label>
                  Username and email address when registering for an account
                  (used for identification and participation in discussions).
                </Label>
              </li>
              <li className="ml-6">
                <Label>
                  Basic profile information (name and email) from Google OAuth
                  login (based on your Google privacy settings).
                </Label>
              </li>
            </ul>
          </li>
          <li className="ml-6">
            <h3>Information Collected Automatically:</h3>
            <ul>
              <li className="ml-6">
                <Label>
                  Browser type, operating system, and content accessed (used for
                  internal analytics).
                </Label>
              </li>
            </ul>
          </li>
          <li className="ml-6">
            <h3>Cookies and Similar Technologies:</h3>
            <ul>
              <li className="ml-6">
                <Label>
                  Cookies are only used to hold certain information (improve the
                  Service).
                </Label>
              </li>
            </ul>
          </li>
        </ul>

        <h2>Use of Your Information</h2>
        <Label>We use the information we collect to:</Label>
        <Label>
          <ul className=" list-disc">
            <li className="ml-6">
              Identify you and allow participation in discussions.
            </li>
            <li className="ml-6">
              Send important information about the Service.
            </li>
            <li className="ml-6">Improve and personalize your experience.</li>
          </ul>
        </Label>
        <h2>Sharing of Your Information</h2>
        <Label>
          We do not share your personal information for third-party marketing.
          However, we may share in the following situations:
        </Label>
        <Label>
          <ul className=" list-disc">
            <li className="ml-6">
              With service providers who help operate and maintain the Service.
            </li>
            <li className="ml-6">
              To comply with legal obligations or respond to legal process.
            </li>
            <li className="ml-6">
              To protect the rights and safety of Strefa Gier, users, or the
              public.
            </li>
          </ul>
        </Label>

        <h2>Data Retention</h2>
        <Label>
          We retain your information for account activity, service provision,
          legal obligations, dispute resolution, and agreement enforcement.
        </Label>

        <h2>Your Choices</h2>
        <Label>
          You can access and update your information in your account settings.
        </Label>
        <Label>
          You can adjust browser settings to opt-out of certain cookies, but
          this may affect your interaction with the Service.
        </Label>

        <h2>Children's Privacy</h2>
        <Label>
          Our Service is not directed to children under 13. We do not knowingly
          collect personal information from children under 13. Please contact us
          if you are a parent or guardian and believe your child has provided us
          with personal information.
        </Label>

        <h2>Security</h2>
        <Label>
          We take reasonable steps to protect your information, but no internet
          transmission or electronic storage method is completely secure.
        </Label>

        <h2>Changes to this Privacy Policy</h2>
        <Label>
          We may update our Privacy Policy. We will notify you by posting the
          new Privacy Policy on this page.
        </Label>

        <h2>Contact Us</h2>
        <Label>
          If you have any questions about this Privacy Policy, please contact us
          on discord: highlighted_.
        </Label>
        <Separator className="my-4 " />
        <Label className="flex justify-end items-end w-full">
          Effective Date: June 25, 2024
        </Label>
      </div>
    </div>
  );
}
