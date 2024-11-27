<?php
// Register block and handle server-side rendering
function gutensee_render_contact_form_callback($attributes) {
    $Name=($attributes['namelabel']==true)?'required':'';
    $uniqueid=$attributes['uniqueid'];
    $displaydesktop=($attributes['hidedesktop'] != true) ? 'hide-desktop' : '';
    $displaytablet=($attributes['hidetablet'] != true)   ? 'hide-tablet' : '';
    $displaymobile=($attributes['hidemobile'] != true)   ? 'hide-mobile' : '';
    $displayclass=$displaydesktop.' '.$displaytablet.' '.$displaymobile;
    $animationclass='wow animated '.$attributes['durations'].' '.$attributes['animation'];
   // $alignmentClass = ($attributes['textAlignment'] != null) ? 'has-text-align-'.$attributes['textAlignment'] : '';

    ob_start(); ?>      
    <div id="<?php echo esc_attr($attributes['advid']);?>'">
        <form id="<?php echo esc_attr($attributes['uniqueid']);?>" class="gutensee-contact-form <?php echo esc_attr($displayclass.' '.$animationclass.' '.$attributes['advclass']); ?>">
            <?php wp_nonce_field('gutensee_form_nonce_action', 'gutensee_form_nonce'); ?>
            <div class="custom-contact-form <?php echo esc_attr($attributes['style']);?>" >
                <?php if($attributes['enablename']==true){?>
                    <div class="custom-contact-name">
                        <div class="contact-form-field">
                            <?php if($attributes['enablelabel']==true){?><label for="name"><?php echo esc_html($attributes['namelabel'],'gutensee'); ?></label><?php } ?>
                            <input type="text" id="name" name="name" <?php if($attributes['enableplaceholder']==true){?>placeholder="<?php echo esc_attr($attributes['nameholder'],'gutensee'); ?>"<?php } ?> class="contact-form-input-field name" required><br>
                        </div>
                    </div>
                <?php 
                }
                if($attributes['enableemail']==true){?>
                    <div class="custom-contact-email">
                        <div class="contact-form-field">
                            <?php if($attributes['enablelabel']==true){?><label for="email"><?php echo esc_html($attributes['emaillabel'],'gutensee'); ?></label><?php } ?>
                            <input type="email" id="email" name="email" <?php if($attributes['enableplaceholder']==true){?>placeholder="<?php echo esc_attr($attributes['nameholder'],'gutensee'); ?>"<?php } ?> class="contact-form-input-field email " required><br>
                        </div>
                    </div>
                <?php 
                }
                if($attributes['enablesubject']==true){?>
                    <div class="custom-contact-subject">
                        <div class="contact-form-field">
                          <?php if($attributes['enablelabel']==true){?><label for="subject"><?php echo esc_html($attributes['subjectlabel'],'gutensee'); ?></label><?php } ?>
                          <input type="text" id="subject" name="subject" <?php if($attributes['enableplaceholder']==true){?>placeholder="<?php echo esc_attr($attributes['subjectholder'],'gutensee'); ?>"<?php } ?> class="contact-form-input-field subject" required><br>
                        </div>
                    </div>
                <?php 
                }
                if($attributes['enablemobile']==true){?>
                    <div class="custom-contact-mobile">
                        <div class="contact-form-field">
                          <?php if($attributes['enablelabel']==true){?><label for="subject"><?php echo esc_html($attributes['mobilelabel'],'gutensee'); ?></label><?php } ?>
                          <input type="text" id="mobile" name="mobile" <?php if($attributes['enableplaceholder']==true){?>placeholder="<?php echo esc_attr($attributes['mobileholder'],'gutensee'); ?>"<?php } ?> class="contact-form-input-field mobile" required><br>
                        </div>
                    </div>
                <?php 
                }   
                if($attributes['enablemesg']==true){?>
                    <div class="custom-contact-message">
                        <div class="contact-form-field">
                          <?php if($attributes['enablelabel']==true){?><label for="message"><?php echo esc_html($attributes['mesglabel'],'gutensee'); ?></label><?php } ?>
                          <textarea rows="4" id="message" name="message" <?php if($attributes['enableplaceholder']==true){?>placeholder="<?php echo esc_attr($attributes['mesgholder'],'gutensee'); ?>"<?php } ?> class="contact-form-input-field message" required></textarea><br>
                        </div>
                    </div>
                <?php } ?>
                <div class="custom-contact-button">
                    <button type="submit" class="contact-form-button"><?php echo esc_html($attributes['btnlabel'],'gutensee'); ?></button>
                </div>
           </div>
        </form>
    </div>
    

   <div id="form-response<?php echo esc_attr($attributes['uniqueid']);?>"></div>

   <?php
    $bordertop=(!empty($attributes['border']['top'])) ? $attributes['border']['top']['width'].' '. $attributes['border']['top']['style'].' '. $attributes['border']['top']['color'] : null;
    $borderright=(!empty($attributes['border']['right'])) ? $attributes['border']['right']['width'].' '. $attributes['border']['right']['style'].' '. $attributes['border']['right']['color'] : null;
    $borderbottom=(!empty($attributes['border']['bottom'])) ? $attributes['border']['bottom']['width'].' '. $attributes['border']['bottom']['style'].' '. $attributes['border']['bottom']['color'] : null;
    $borderleft=(!empty($attributes['border']['left'] )) ? $attributes['border']['left']['width'].' '. $attributes['border']['left']['style'].' '. $attributes['border']['left']['color'] : null;

    $borderwidth=(!empty($attributes['border']['width']))? $attributes['border']['width'] :null;
    $borderstyle=(!empty($attributes['border']['style']))? $attributes['border']['style'] :null;
    $bordercolor=(!empty($attributes['border']['color']))? $attributes['border']['color'] :null;

    $labelbordertop=(!empty($attributes['labelborder']['top'])) ? $attributes['labelborder']['top']['width'].' '. $attributes['labelborder']['top']['style'].' '. $attributes['labelborder']['top']['color'] : null;
    $labelborderright=(!empty($attributes['labelborder']['right'])) ? $attributes['labelborder']['right']['width'].' '. $attributes['labelborder']['right']['style'].' '. $attributes['labelborder']['right']['color'] : null;
    $labelborderbottom=(!empty($attributes['labelborder']['bottom'])) ? $attributes['labelborder']['bottom']['width'].' '. $attributes['labelborder']['bottom']['style'].' '. $attributes['labelborder']['bottom']['color'] : null;
    $labelborderleft=(!empty($attributes['labelborder']['left'] )) ? $attributes['labelborder']['left']['width'].' '. $attributes['labelborder']['left']['style'].' '. $attributes['labelborder']['left']['color'] : null;

    $labelborderwidth=(!empty($attributes['labelborder']['width']))? $attributes['labelborder']['width'] :null;
    $labelborderstyle=(!empty($attributes['labelborder']['style']))? $attributes['labelborder']['style'] :null;
    $labelbordercolor=(!empty($attributes['labelborder']['color']))? $attributes['labelborder']['color'] :null;

    $fieldbordertop=(!empty($attributes['fieldborder']['top'])) ? $attributes['fieldborder']['top']['width'].' '. $attributes['fieldborder']['top']['style'].' '. $attributes['fieldborder']['top']['color'] : null;
    $fieldborderright=(!empty($attributes['fieldborder']['right'])) ? $attributes['fieldborder']['right']['width'].' '. $attributes['fieldborder']['right']['style'].' '. $attributes['fieldborder']['right']['color'] : null;
    $fieldborderbottom=(!empty($attributes['fieldborder']['bottom'])) ? $attributes['fieldborder']['bottom']['width'].' '. $attributes['fieldborder']['bottom']['style'].' '. $attributes['fieldborder']['bottom']['color'] : null;
    $fieldborderleft=(!empty($attributes['fieldborder']['left'] )) ? $attributes['fieldborder']['left']['width'].' '. $attributes['fieldborder']['left']['style'].' '. $attributes['fieldborder']['left']['color'] : null;

    $fieldborderwidth=(!empty($attributes['fieldborder']['width']))? $attributes['fieldborder']['width'] :null;
    $fieldborderstyle=(!empty($attributes['fieldborder']['style']))? $attributes['fieldborder']['style'] :null;
    $fieldbordercolor=(!empty($attributes['fieldborder']['color']))? $attributes['fieldborder']['color'] :null;

    $btnbordertop=(!empty($attributes['btnborder']['top'])) ? $attributes['btnborder']['top']['width'].' '. $attributes['btnborder']['top']['style'].' '. $attributes['btnborder']['top']['color'] : null;
    $btnborderright=(!empty($attributes['btnborder']['right'])) ? $attributes['btnborder']['right']['width'].' '. $attributes['btnborder']['right']['style'].' '. $attributes['btnborder']['right']['color'] : null;
    $btnborderbottom=(!empty($attributes['btnborder']['bottom'])) ? $attributes['btnborder']['bottom']['width'].' '. $attributes['btnborder']['bottom']['style'].' '. $attributes['btnborder']['bottom']['color'] : null;
    $btnborderleft=(!empty($attributes['btnborder']['left'] )) ? $attributes['btnborder']['left']['width'].' '. $attributes['btnborder']['left']['style'].' '. $attributes['btnborder']['left']['color'] : null;

    $btnborderwidth=(!empty($attributes['btnborder']['width']))? $attributes['btnborder']['width'] :null;
    $btnborderstyle=(!empty($attributes['btnborder']['style']))? $attributes['btnborder']['style'] :null;
    $btnbordercolor=(!empty($attributes['btnborder']['color']))? $attributes['btnborder']['color'] :null;

   $customcss=$attributes['addcss'];
   $customcss=$attributes['addjs'];

   return ob_get_clean();
}

function gutensee_custom_send_mail() {
    // Verify the nonce
    if (!isset($_POST['gutensee_form_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['gutensee_form_nonce'])), 'gutensee_form_nonce_action')) {
        return new WP_Error('invalid_nonce', 'Invalid nonce verification.', array('status' => 403));
    }
       

    // Sanitize and validate form inputs
    $name    = isset($_POST['name']) ? sanitize_text_field(wp_unslash($_POST['name'])) : '';
    $email   = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $subject = isset($_POST['subject']) ? sanitize_text_field(wp_unslash($_POST['subject'])) : '';
    $mobile  = isset($_POST['mobile']) ? sanitize_text_field(wp_unslash($_POST['mobile'])) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

    // Check if all fields are filled
    if (!$name || !$email || !$subject || !$mobile || !$message) {
        return new WP_Error('invalid_data', 'Please fill in all fields.', array('status' => 400));
    }

    // Email details
    $to = get_option('admin_email');
    $headers = array('Content-Type: text/html; charset=UTF-8');
    $mail_subject = "New Contact Message from $name";

    // Create the message body with correct labels
    $mail_body = "<strong>Name:</strong> $name <br/>";
    $mail_body .= "<strong>Email:</strong> $email <br/>";
    $mail_body .= "<strong>Subject:</strong> $subject <br/>";
    $mail_body .= "<strong>Mobile:</strong> $mobile <br/>";
    $mail_body .= "<strong>Message:</strong> $message <br/>";

    // Send the mail
    if (wp_mail($to, $mail_subject, $mail_body, $headers)) {
        return new WP_REST_Response(array('message' => 'Mail sent successfully!'), 200);
    } else {
        return new WP_Error('mail_failed', 'Failed to send mail', array('status' => 500));
    }
}

add_action('rest_api_init', function() {
    register_rest_route('custom/v1', '/send-mail', array(
        'methods' => 'POST',
        'callback' => 'gutensee_custom_send_mail',
        'permission_callback' => '__return_true',  // Allow anyone to access this route
    ));
});
