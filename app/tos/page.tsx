import React from "react";
import "../../styles/editor.css";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
export default function TOSPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="mb-6 flex flex-col justify-center items-start gap-4"
        id="editor"
      >
        <h1> Terms of Service </h1>
        <Label>
          <h3>Introduction </h3> Welcome to Strefa Gier ("the Website"), a
          discussion forum dedicated to Garry's Mod servers. By accessing or
          using our Website, you agree to comply with and be bound by these
          Terms of Service ("Terms"). If you do not agree to these Terms, please
          do not use our Website.
        </Label>
        <Label>
          <h3> 1. Acceptance of Terms</h3> By accessing or using Strefa Gier,
          you confirm that you are at least 13 years old and that you accept
          these Terms and our Privacy Policy. If you are under 13, you may not
          use the Website.
        </Label>
        <Label>
          <h3> 2. Registration and Accounts</h3> To participate in discussions
          and access certain features of the Website, you must register for an
          account using Google OAuth. By registering, you agree to provide
          accurate and current information and to maintain the security of your
          account.
        </Label>
        <Label>
          <h3> 3. User Conduct</h3> As a user of Strefa Gier, you agree to the
          following: - Respect other members of the community. - Do not post any
          content that is abusive, hateful, discriminatory, or violates any
          laws. - Do not spam or post irrelevant content. - Do not share
          personal information of others without their consent. - Do not engage
          in any illegal activities on the Website.
        </Label>
        <Label>
          <h3> 4. Content Ownership and Usage</h3> You retain ownership of any
          content you post on Strefa Gier. However, by posting content, you
          grant us a non-exclusive, royalty-free, perpetual, and worldwide
          license to use, modify, and distribute your content in connection with
          the Website's operations.
        </Label>
        <Label>
          <h3> 5. Moderation</h3> We reserve the right to monitor and moderate
          content posted on Strefa Gier. We may remove any content that violates
          these Terms or is deemed inappropriate at our sole discretion. We also
          reserve the right to suspend or terminate accounts that violate these
          Terms.
        </Label>
        <Label>
          <h3> 6. Intellectual Property</h3> All content and materials on Strefa
          Gier, including but not limited to text, graphics, logos, and
          software, are the property of Strefa Gier or its content suppliers and
          are protected by intellectual property laws. Unauthorized use of any
          materials on the Website is strictly prohibited.
        </Label>
        <Label>
          <h3>7. Privacy</h3> Your use of the Website is also governed by our
          Privacy Policy, which explains how we collect, use, and protect your
          information. By using the Website, you consent to the collection and
          use of your information as described in the Privacy Policy.
        </Label>
        <Label>
          <h3> 8. Third-Party Links</h3> Strefa Gier may contain links to
          third-party websites. We are not responsible for the content or
          privacy practices of these websites. Accessing third-party links is at
          your own risk.
        </Label>
        <Label>
          <h3> 9. Disclaimers</h3> Strefa Gier is provided "as is" without any
          warranties of any kind, either express or implied. We do not warrant
          that the Website will be error-free or uninterrupted, nor do we make
          any warranties regarding the accuracy, reliability, or availability of
          any content on the Website.
        </Label>
        <Label>
          <h3>10. Limitation of Liability</h3> In no event shall Strefa Gier,
          its owners, or its moderators be liable for any direct, indirect,
          incidental, special, or consequential damages arising out of or in
          connection with your use of the Website.
        </Label>
        <Label>
          <h3>11. Changes to the Terms</h3> We reserve the right to modify these
          Terms at any time. Any changes will be posted on this page, and it is
          your responsibility to review these Terms periodically. Your continued
          use of the Website after any changes constitutes your acceptance of
          the new Terms.
        </Label>
        <Label>
          <h3>12. Governing Law</h3> These Terms shall be governed by and
          construed in accordance with the laws of the jurisdiction in which
          Strefa Gier operates, without regard to its conflict of law
          provisions.
        </Label>
        <Label>
          <h3> 13. Contact Information</h3> If you have any questions or
          concerns about these Terms, please contact us on discord: highlighted_
          . Thank you for using Strefa Gier!
        </Label>
        <Separator className="my-4" />
        <div className=" flex justify-end items-end w-full">
          <Label className=" italic text-right">Last Updated: 25.06.2024</Label>
        </div>
      </div>
    </div>
  );
}
