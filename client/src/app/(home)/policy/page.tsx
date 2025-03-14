const PolicyPage = () => {
  return (
    <div className='md:w-[90%] mx-auto p-6 pt-40'>
      <h1 className='text-3xl font-bold text-center mb-6'>★ POLICY ★</h1>

      {/* Return Policy */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-3'>1. Return Policy</h2>
        <p className='mb-2'>
          At FISHIZZY, we take pride in delivering the highest quality dried
          fish to our customers. However, if you are not satisfied with your
          purchase, we offer the following return policy:
        </p>

        <h3 className='text-xl font-medium mt-4'>Return Process</h3>
        <ul className='list-disc pl-6'>
          <li>
            Inspect the product in the presence of the delivery personnel.
          </li>
          <li>If unsatisfied, return it immediately.</li>
        </ul>

        <h3 className='text-xl font-medium mt-4'>Returns After Delivery</h3>
        <ul className='list-disc pl-6'>
          <li>
            Report issues within <strong>5 days</strong> of delivery via{' '}
            <span className='text-blue-600'>
              <a target='_blank' href='https://wa.me/01626974685'>
                WhatsApp
              </a>
            </span>
            .
          </li>
          <li>Repackage the product securely and contact us.</li>
          <li>We will arrange for pickup or provide return instructions.</li>
        </ul>

        <h3 className='text-xl font-medium mt-4'>Conditions for Returns</h3>
        <ul className='list-disc pl-6'>
          <li>Original packaging and resalable condition required.</li>
          <li>Proof of purchase needed (order number or receipt).</li>
        </ul>

        <h3 className='text-xl font-medium mt-4'>Non-Returnable Items</h3>
        <ul className='list-disc pl-6'>
          <li>Opened or partially consumed dried fish cannot be returned.</li>
        </ul>
      </section>

      {/* Refund Policy */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-3'>2. Refund Policy</h2>
        <p>
          We strive to ensure your complete satisfaction with every purchase.
        </p>

        <h3 className='text-xl font-medium mt-4'>Replacement or Refund</h3>
        <p>
          Upon receiving the returned product, we will inspect it and either
          replace it or issue a refund.
        </p>

        <h3 className='text-xl font-medium mt-4'>Eligibility for Refunds</h3>
        <ul className='list-disc pl-6'>
          <li>Product dissatisfaction.</li>
          <li>Quality or taste issues.</li>
          <li>Mismatch with description.</li>
        </ul>

        <h3 className='text-xl font-medium mt-4'>Refund Process</h3>
        <ul className='list-disc pl-6'>
          <li>
            Refunds are issued to the original payment method within{' '}
            <strong>5-7 business days</strong>.
          </li>
          <li>Shipping fees are non-refundable unless due to our error.</li>
        </ul>

        <h3 className='text-xl font-medium mt-4'>Non-Refundable Situations</h3>
        <ul className='list-disc pl-6'>
          <li>Products that are opened, used, or damaged by the customer.</li>
        </ul>
      </section>

      {/* Privacy Policy */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-3'>3. Privacy Policy</h2>
        <p>At FISHIZZY, we are committed to protecting your privacy.</p>

        <h3 className='text-xl font-medium mt-4'>Information We Collect</h3>
        <ul className='list-disc pl-6'>
          <li>Name, email, phone, and shipping details.</li>
          <li>Payment information is processed securely.</li>
          <li>Browsing behavior on our website or social media.</li>
        </ul>
      </section>

      {/* Delivery Policy */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-3'>4. Delivery Policy</h2>
        <h3 className='text-xl font-medium mt-4'>Delivery Areas</h3>
        <p>We currently deliver to Dhaka areas.</p>

        <h3 className='text-xl font-medium mt-4'>Shipping Time</h3>
        <p>
          Orders are processed within <strong>3 business days</strong>. Delivery
          times vary based on location.
        </p>

        <h3 className='text-xl font-medium mt-4'>Shipping Fees</h3>
        <p>Fees are calculated at checkout based on location and weight.</p>
      </section>

      {/* Terms & Conditions */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-3'>5. Terms & Conditions</h2>
        <h3 className='text-xl font-medium mt-4'>Order Acceptance</h3>
        <p>
          All orders are subject to product availability. We reserve the right
          to cancel orders.
        </p>

        <h3 className='text-xl font-medium mt-4'>Pricing and Payment</h3>
        <p>
          Prices are listed in Taka and may change without notice. Full payment
          is required at purchase.
        </p>

        <h3 className='text-xl font-medium mt-4'>Product Descriptions</h3>
        <p>
          We provide accurate descriptions, but slight variations may occur.
        </p>

        <h3 className='text-xl font-medium mt-4'>Limitation of Liability</h3>
        <p>
          FISHIZZY is not liable for indirect, incidental, or consequential
          damages.
        </p>

        <h3 className='text-xl font-medium mt-4'>Governing Law</h3>
        <p>These policies are governed by the laws of Bangladesh.</p>
      </section>
    </div>
  );
};

export default PolicyPage;
