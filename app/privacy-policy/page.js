import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Container
      maxWidth='xl'
      disableGutters
      sx={{
        // background:
        //   'linear-gradient(to top right, rgb(130, 290, 274), rgb(245, 245, 245), rgb(130, 290, 274), rgb(245, 245, 245) )',
        // background: 'rgb(175, 238, 238)',

        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          variant='h1'
          component='h1'
          sx={{ fontWeight: 'bold', color: 'black' }}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant='h3'
          component='h3'
          sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}
        >
          Last updated September 04, 2024
        </Typography>
        {/* <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', pl: 15, pr: 15 }}
          textAlign='center'
        >
          This Privacy Notice for Paul Clue (doing business as Fast Cards)
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how
          and why we might access, collect, store, use, and/or share
          (&quot;process&quot;) your personal information when you use our
          services (&quot;Services&quot;), including when you:
          {<br />}
          {<br />}
          Visit our website at http://www.fstcards.com, or any website of ours
          that links to this Privacy Notice
          {<br />}
          Download and use our mobile application (Fast Cards), or any other
          application of ours that links to this Privacy Notice
          {<br />}
          Engage with us in other related ways, including any sales, marketing,
          or events
        </Typography> */}

        {/* <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', mt: 2, pl: 15, pr: 15 }}
          textAlign='center'
        >
          Questions or concerns? Reading this Privacy Notice will help you
          understand your privacy rights and choices. We are responsible for
          making decisions about how your personal information is processed. If
          you do not agree with our policies and practices, please do not use
          our Services. If you still have any questions or concerns, please
          contact us at pc557340@gmail.com
        </Typography> */}
        {/* <Typography
          variant='h3'
          component='h3'
          sx={{
            fontWeight: 'bold',
            color: 'black',
            mb: 2,
            mt: 2,
            pl: 15,
            pr: 15,
          }}
        >
          SUMMARY OF KEY POINTS
        </Typography> */}
        {/* <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', mt: 2, pl: 15, pr: 15 }}
          textAlign='center'
        >
          What personal information do we process? When you visit, use, or
          navigate our Services, we may process personal information depending
          on how you interact with us and the Services, the choices you make,
          and the products and features you use.
        </Typography>
        <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', mt: 2, pl: 15, pr: 15 }}
          textAlign='center'
        >
          Do we process any sensitive personal information? Some of the
          information may be considered &quot;special&quot; or
          &quot;sensitive&quot; in certain jurisdictions, for example your
          racial or ethnic origins, sexual orientation, and religious beliefs.
          We do not process sensitive personal information.
        </Typography>
        <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', mt: 2, pl: 15, pr: 15 }}
          textAlign='center'
        >
          Do we collect any information from third parties? We do not collect
          any information from third parties.
        </Typography>
        <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', mt: 2, pl: 15, pr: 15 }}
          textAlign='center'
        >
          How do we process your information? We process your information to
          provide, improve, and administer our Services, communicate with you,
          for security and fraud prevention, and to comply with law. We may also
          process your information for other purposes with your consent. We
          process your information only when we have a valid legal reason to do
          so
        </Typography> */}
        <Typography
          variant='p'
          component='p'
          sx={{ color: 'black', mt: 2, pl: 15, pr: 15 }}
          textAlign='center'
        >
          This Privacy Notice for Paul Clue (doing business as Fast Cards)
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how
          and why we might access, collect, store, use, and/or share
          (&quot;process&quot;) your personal information when you use our
          services (&quot;Services&quot;), including when you:
          {<br />}
          {<br />}
          Visit our website at http://www.fstcards.com, or any website of ours
          that links to this Privacy Notice
          {<br />}
          Download and use our mobile application (Fast Cards), or any other
          application of ours that links to this Privacy Notice
          {<br />}
          Engage with us in other related ways, including any sales, marketing,
          or events
          {<br />}
          Questions or concerns? Reading this Privacy Notice will help you
          understand your privacy rights and choices. We are responsible for
          making decisions about how your personal information is processed. If
          you do not agree with our policies and practices, please do not use
          our Services. If you still have any questions or concerns, please
          contact us at pc557340@gmail.com
          {<br />}
          {<br />}
          What personal information do we process? When you visit, use, or
          navigate our Services, we may process personal information depending
          on how you interact with us and the Services, the choices you make,
          and the products and features you use.
          {<br />}
          Do we process any sensitive personal information? Some of the
          information may be considered &quot;special&quot; or
          &quot;sensitive&quot; in certain jurisdictions, for example your
          racial or ethnic origins, sexual orientation, and religious beliefs.
          We do not process sensitive personal information.
          {<br />}
          Do we collect any information from third parties? We do not collect
          any information from third parties.
          {<br />}
          How do we process your information? We process your information to
          provide, improve, and administer our Services, communicate with you,
          for security and fraud prevention, and to comply with law. We may also
          process your information for other purposes with your consent. We
          process your information only when we have a valid legal reason to do
          so
          {<br />}
          In what situations and with which parties do we share personal information? We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.
          {<br />}
          How do we keep your information safe? We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cyber criminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.
          {<br />}
          What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.
          {<br />}
          How do you exercise your rights? The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
          {<br />}
          {<br />}
          1. WHAT INFORMATION DO WE COLLECT?
          {<br />}
          Personal information you disclose to us
          {<br />}
          In Short: We collect personal information that you provide to us. We
          collect personal information that you voluntarily provide to us when
          you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
          {<br />}
          Personal Information Provided by You. The personal information that we
          collect depends on the context of your interactions with us and the
          Services, the choices you make, and the products and features you use.
          The personal information we collect may include the following:
          {<br />}
          email addresses
          {<br />}
          passwords
          {<br />}
          billing addresses
          {<br />}
          Sensitive Information. We do not process sensitive information.
          {<br />}
          Payment Data. We may collect data necessary to process your payment if
          you choose to make purchases, such as your payment instrument number,
          and the security code associated with your payment instrument. All
          payment data is handled and stored by Stripe. You may find their
          privacy notice link(s) here: https://stripe.com/privacy.
          {<br />}
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information
          {<br />}
          {<br />}
          2. HOW DO WE PROCESS YOUR INFORMATION?
          {<br />}
          In Short: We process your information to provide, improve, and
          administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law. We may also process your
          information for other purposes with your consent.
          {<br />}
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including: To save or
          protect an individual&apos;s vital interest. We may process your
          information when necessary to save or protect an individual’s vital
          interest, such as to prevent harm.
          {<br />}
          {<br />}
          3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
          {<br />}
          InShort: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws,to provide you with services to enter into or fulfill our contractual
          obligations, to protect your rights, or to fulfill our legitimate
          business interests.
          {<br />}
          If you are located in the EU or UK, this section applies to you. The
          General Data Protection Regulation (GDPR) and UK GDPR require us to
          explain the valid legal bases we rely on in order to process your
          personal information. As such, we may rely on the following legal
          bases to process your personal information:
          {<br />}
          Consent. We may process your information if you have given us
          permission (i.e., consent) to use your personal information for a
          specific purpose. You can withdraw your consent at any time. Learn
          more about withdrawing your consent.
          {<br />}
          Legal Obligations. We may process your information where we believe it
          is necessary for compliance with our legal obligations, such as to
          cooperate with a law enforcement body or regulatory agency, exercise
          or defend our legal rights, or disclose your information as evidence
          in litigation in which we are involved.
          {<br />}
          Vital Interests. We may process your information where we believe it
          is necessary to protect your vital interests or the vital interests of
          a third party, such as situations involving potential threats to the
          safety of any person.
          {<br />}
          If you are located in Canada, this section applies to you. We may
          process your information if you have given us specific permission
          (i.e., express consent) to use your personal information for a
          specific purpose, or in situations where your permission can be
          inferred (i.e., implied consent). You can withdraw your consent at any
          time.
          {<br />}
          {<br />}
          In some exceptional cases, we may be legally permitted under
          applicable law to process your information without your consent,
          including, for example:
          {<br />}
          {<br />}
          If collection is clearly in the interests of an individual and consent
          cannot be obtained in a timely way For investigations and fraud
          detection and prevention For business transactions provided certain
          conditions are met If it is contained in a witness statement and the
          collection is necessary to assess, process, or settle an insurance
          claim For identifying injured, ill, or deceased persons and
          communicating with next of kin.
          {<br />}
          If we have reasonable grounds to believe an individual has been, is,
          or may be victim of financial abuse
          {<br />}
          If it is reasonable to expect collection and use with consent would
          compromise the availability or the accuracy of the information and the
          collection is reasonable for purposes related to investigating a
          breach of an agreement or a contravention of the laws of Canada or a
          province
          {<br />}
          If disclosure is required to comply with a subpoena, warrant, court
          order, or rules of the court relating to the production of records
          {<br />}
          If it was produced by an individual in the course of their employment,
          business, or profession and the collection is consistent with the
          purposes for which the information was produced
          {<br />}
          If the collection is solely for journalistic, artistic, or literary
          purposes
          {<br />}
          If the information is publicly available and is specified by the
          regulations
          {<br />}
          {<br />}
          4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION? 
          {<br />}
          In
          Short: We may share information in specific situations described in
          this section and/or with the following third parties.
          {<br />}
          We may need to share your personal information in the following
          situations:
          {<br />}
          Business Transfers. We may share or transfer your information in
          connection with, or during negotiations of, any merger, sale of
          company assets, financing, or acquisition of all or a portion of our
          business to another company.
          {<br />}
          {<br />}
          5. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
          {<br />}
          In Short: We
          offer products, features, or tools powered by artificial intelligence,
          machine learning, or similar technologies. As part of our Services, we
          offer products, features, or tools powered by artificial intelligence,
          machine learning, or similar technologies (collectively, &quot;AI
          Products&quot;). These tools are designed to enhance your experience
          and provide you with innovative solutions. The terms in this Privacy
          Notice govern your use of the AI Products within our Services. Use of
          AI Technologies
          {<br />}
          We provide the AI Products through third-party service providers
          (&quot;AI Service Providers&quot;), including OpenAI. You must not use
          the AI Products in any way that violates the terms or policies of any
          AI Service Provider.
          {<br />}
          Our AI Products
          {<br />}
          Our AI Products are designed for the following functions:
          {<br />}
          AI research
          {<br />}
          AI insights
          {<br />}
          Machine learning models
          {<br />}
          Text analysis
          {<br />}
          {<br />}
          How We Process Your Data Using AI
          {<br />}
          All personal information processed using our AI Products is handled in
          line with our Privacy Notice and our agreement with third parties.
          This ensures high security and safeguards your personal information
          throughout the process, giving you peace of mind about your
          data&apos;s safety.
          {<br />}
          6. HOW LONG DO WE KEEP YOUR INFORMATION?
          {<br />}
          In Short: We keep your information for as long as necessary to fulfill
          the purposes outlined in this Privacy Notice unless otherwise required
          by law.
          {<br />}
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this Privacy Notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements).
          {<br />}
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
          {<br />}
          {<br />}
          7. HOW DO WE KEEP YOUR INFORMATION SAFE?
          {<br />}
          In Short: We aim to protect your personal information through a system
          of organizational and technical security measures.
          {<br />}
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cyber criminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
          {<br />}
          {<br />}
          8. DO WE COLLECT INFORMATION FROM MINORS?
          {<br />}
          In Short: We do not knowingly collect data from or market to children
          under 18 years of age.
          {<br />}
          We do not knowingly collect, solicit data from, or market to children
          under 18 years of age, nor do we knowingly sell such personal
          information. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent’s use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at pc557340@gmail.com.
          {<br />}
          {<br />}
          9. WHAT ARE YOUR PRIVACY RIGHTS?
          {<br />}n Short: Depending on your state of residence in the US or in
          some regions, such as the European Economic Area (EEA), United Kingdom
          (UK), Switzerland, and Canada, you have rights that allow you greater
          access to and control over your personal information. You may review,
          change, or terminate your account at any time, depending on your
          country, province, or state of residence.
          {<br />}
          In some regions (like the EEA, UK, Switzerland, and Canada), you have
          certain rights under applicable data protection laws. These may
          include the right (i) to request access and obtain a copy of your
          personal information, (ii) to request rectification or erasure; (iii)
          to restrict the processing of your personal information; (iv) if
          applicable, to data portability; and (v) not to be subject to
          automated decision-making. In certain circumstances, you may also have
          the right to object to the processing of your personal information.
          You can make such a request by contacting us by using the contact
          details provided.
          {<br />}
          We will consider and act upon any request in accordance with
          applicable data protection laws.
          {<br />}
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your Member State data protection authority or UK data
          protection authority.
          {<br />}
          If you are located in Switzerland, you may contact the Federal Data
          Protection and Information Commissioner.
          {<br />}
          Withdrawing your consent: If we are relying on your consent to process
          your personal information, which may be express and/or implied consent
          depending on the applicable law, you have the right to withdraw your
          consent at any time. You can withdraw your consent at any time by
          contacting us by using the contact details provided.
          {<br />}
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
          {<br />}
          If you have questions or comments about your privacy rights, you may
          email us at pc557340@gmail.com.
          {<br />}
          {<br />}
          10. CONTROLS FOR DO-NOT-TRACK FEATURES
          {<br />}
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (&quot;DNT&quot;) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage, no uniform technology standard for recognizing and
          implementing DNT signals has been finalized. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this Privacy Notice.
          {<br />}
          California law requires us to let you know how we respond to web
          browser DNT signals. Because there currently is not an industry or
          legal standard for recognizing or honoring DNT signals, we do not
          respond to them at this time.
          {<br />}
          {<br />}
          11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          {<br />}
          In Short: If you are a resident of California, Colorado, Connecticut,
          Delaware, Florida, Indiana, Iowa, Kentucky, Montana, New Hampshire,
          New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you may have
          the right to request access to and receive details about the personal
          information we maintain about you and how we have processed it,
          correct inaccuracies, get a copy of, or delete your personal
          information. You may also have the right to withdraw your consent to
          our processing of your personal information. These rights may be
          limited in some circumstances by applicable law. More information is
          provided below.
          {<br />}
          Categories of Personal Information We Collect
          {<br />}
          We have collected the following categories of personal information in
          the past twelve (12) months: email address
          {<br />}
          We may also collect other personal information outside of these
          categories through instances where you interact with us in person,
          online, or by phone or mail in the context of:
          {<br />}
          Receiving help through our customer support channels; Participation in
          customer surveys or contests; and Facilitation in the delivery of our
          Services and to respond to your inquiries.
          {<br />}
          We will use and retain the collected personal information as needed to
          provide the Services or for:
          {<br />}
          Category A - As long as the user has an account with us
          {<br />}
          Category H - No sensory data is collected
          {<br />}
          How We Use and Share Personal Information
          {<br />}
          Will your information be shared with anyone else? We may disclose your
          personal information with our service providers pursuant to a written
          contract between us and each service provider. We may use your
          personal information for our own business purposes, such as for
          undertaking internal research for technological development and
          demonstration. This is not considered to be &quot;selling&quot; of
          your personal information.
          {<br />}
          We have not disclosed, sold, or shared any personal information to
          third parties for a business or commercial purpose in the preceding
          twelve (12) months. We will not sell or share personal information in
          the future belonging to website visitors, users, and other consumers.
          {<br />}
          Your Rights
          {<br />}
          You have rights under certain US state data protection laws. However,
          these rights are not absolute, and in certain cases, we may decline
          your request as permitted by law. These rights include: Right to know
          whether or not we are processing your personal dataRight to
          access your personal dataRight to correct inaccuracies in your
          personal dataRight to request the deletion of your personal dataRight
          to obtain a copy of the personal data you previously shared with
          usRight to non-discrimination for exercising your rightsRight to opt
          out of the processing of your personal data if it is used for targeted
          advertising (or sharing as defined under California’s privacy law),
          the sale of personal data, or profiling in furtherance of decisions
          that produce legal or similarly significant effects
          {<br />}
          Depending upon the state where you live, you may also have the
          following rights:
          {<br />}
          Right to obtain a list of the categories of third parties to which we
          have disclosed personal data (as permitted by applicable law,
          including California&apos;s and Delaware&apos;s privacy law) Right to
          obtain a list of specific third parties to which we have disclosed
          personal data (as permitted by applicable law, including Oregon’s
          privacy law)Right to limit use and disclosure of sensitive personal
          data (as permitted by applicable law, including California’s privacy
          law)
          {<br />}
          Right to opt out of the collection of sensitive data and personal data
          collected through the operation of a voice or facial recognition
          feature (as permitted by applicable law, including Florida’s privacy
          law)
          {<br />}
          How to Exercise Your Rights
          {<br />}
          To exercise these rights, you can contact us by submitting a data
          subject access request, by emailing us at pc557340@gmail.com, or by
          referring to the contact details at the bottom of this document.
          {<br />}
          Under certain US state data protection laws, you can designate an
          authorized agent to make a request on your behalf. We may deny a
          request from an authorized agent that does not submit proof that they
          have been validly authorized to act on your behalf in accordance with
          applicable laws.
          {<br />}
          Request Verification
          {<br />}
          Upon receiving your request, we will need to verify your identity to
          determine you are the same person about whom we have the information
          in our system. We will only use personal information provided in your
          request to verify your identity or authority to make the request.
          However, if we cannot verify your identity from the information
          already maintained by us, we may request that you provide additional
          information for the purposes of verifying your identity and for
          security or fraud-prevention purposes.
          {<br />}
          If you submit the request through an authorized agent, we may need to
          collect additional information to verify your identity before
          processing your request and the agent will need to provide a written
          and signed permission from you to submit such request on your behalf.
          {<br />}
          Appeals
          {<br />}
          Under certain US state data protection laws, if we decline to take
          action regarding your request, you may appeal our decision by emailing
          us at pc557340@gmail.com. We will inform you in writing of any action
          taken or not taken in response to the appeal, including a written
          explanation of the reasons for the decisions. If your appeal is
          denied, you may submit a complaint to your state attorney general.
          {<br />}
          California &quot;Shine The Light&quot; Law
          {<br />}
          California Civil Code Section 1798.83, also known as the &quot;Shine
          The Light&quot; law, permits our users who are California residents to
          request and obtain from us, once a year and free of charge,
          information about categories of personal information (if any) we
          disclosed to third parties for direct marketing purposes and the names
          and addresses of all third parties with which we shared personal
          information in the immediately preceding calendar year. If you are a
          California resident and would like to make such a request, please
          submit your request in writing to us by using the contact details
          provided.
          {<br />}
          {<br />}
          12. DO WE MAKE UPDATES TO THIS NOTICE?
          {<br />}
          In Short: Yes, we will update this notice as necessary to stay
          compliant with relevant laws.
          {<br />}
          We may update this Privacy Notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date at
          the top of this Privacy Notice. If we make material changes to this
          Privacy Notice, we may notify you either by prominently posting a
          notice of such changes or by directly sending you a notification. We
          encourage you to review this Privacy Notice frequently to be informed
          of how we are protecting your information.
          {<br />}
          {<br />}
          13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          {<br />}
          If you have questions or comments about this notice, you may email us
          at pc557340@gmail.com or contact us by post at:
          {<br />}
          Paul Clue89-16 Jamaica AveWoodhaven, NY 11421United States
          {<br />}
          {<br />}
          14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
          {<br />}
          Based on the applicable laws of your country or state of residence in
          the US, you may have the right to request access to the personal
          information we collect from you, details about how we have processed
          it, correct inaccuracies, or delete your personal information. You may
          also have the right to withdraw your consent to our processing of your
          personal information. These rights may be limited in some
          circumstances by applicable law. To request to review, update, or
          delete your personal information, please fill out and submit a data
          subject access request.
        </Typography>
      </Box>
    </Container>
  );
}
