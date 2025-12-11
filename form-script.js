// Form Script for ScanSentry

// Package data
const packages = {
  basic: { name: 'Basic Starter', price: '৳999' },
  professional: { name: 'Professional', price: '৳1,999' },
  executive: { name: 'Executive Elite', price: '৳3,999' },
  custom: { name: 'Custom Package', price: 'Custom' }
};

// Track entry counts
let workExperienceCount = 1;
let educationCount = 1;
let certificationCount = 1;
let referenceCount = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Get selected package from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPlan = urlParams.get('package') || 'professional';
  
  // Update displayed package
  updatePackageDisplay(selectedPlan);
  
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Form submission
  const form = document.getElementById('cvForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  // File upload display
  setupFileUploads();
});

// Update package display
function updatePackageDisplay(planKey) {
  const plan = packages[planKey] || packages.professional;
  
  document.getElementById('selectedPackageName').textContent = plan.name;
  document.getElementById('selectedPackagePrice').textContent = plan.price;
  document.getElementById('submitPackageName').textContent = plan.name;
  document.getElementById('submitPackagePrice').textContent = plan.price;
  document.getElementById('modalPackageName').textContent = plan.name;
}

// Toggle current job checkbox
function toggleCurrentJob(index) {
  const endDateInput = document.getElementById(`workEndDate_${index}`);
  const checkbox = document.querySelector(`input[name="workCurrent_${index}"]`);
  
  if (checkbox && checkbox.checked) {
    endDateInput.value = '';
    endDateInput.disabled = true;
  } else {
    endDateInput.disabled = false;
  }
}

// Add Work Experience
function addWorkExperience() {
  const container = document.getElementById('workExperienceContainer');
  const newIndex = workExperienceCount;
  
  // Show remove button on first entry
  if (workExperienceCount === 1) {
    document.querySelector('.experience-entry[data-index="0"] .remove-entry-btn').style.display = 'flex';
  }
  
  const html = `
    <div class="experience-entry" data-index="${newIndex}">
      <div class="entry-header">
        <span class="entry-number">Experience #${newIndex + 1}</span>
        <button type="button" class="remove-entry-btn" onclick="removeWorkExperience(${newIndex})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Job Title <span class="required-star">*</span></label>
          <input type="text" name="workTitle_${newIndex}" required placeholder="e.g., Senior Software Engineer">
        </div>
        
        <div class="form-group">
          <label>Company Name <span class="required-star">*</span></label>
          <input type="text" name="workCompany_${newIndex}" required placeholder="e.g., Tech Corp Ltd.">
        </div>
        
        <div class="form-group full-width">
          <label>Company Address / Location</label>
          <input type="text" name="workLocation_${newIndex}" placeholder="e.g., Dhaka, Bangladesh">
        </div>
        
        <div class="form-group">
          <label>Start Date <span class="required-star">*</span></label>
          <input type="month" name="workStartDate_${newIndex}" required>
        </div>
        
        <div class="form-group">
          <label>End Date</label>
          <div class="date-with-checkbox">
            <input type="month" name="workEndDate_${newIndex}" id="workEndDate_${newIndex}">
            <label class="checkbox-label">
              <input type="checkbox" name="workCurrent_${newIndex}" onchange="toggleCurrentJob(${newIndex})">
              Currently working here
            </label>
          </div>
        </div>
        
        <div class="form-group full-width">
          <label>Key Responsibilities & Achievements</label>
          <textarea name="workDescription_${newIndex}" rows="4" placeholder="Describe your key responsibilities, achievements, and impact in this role..."></textarea>
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  workExperienceCount++;
}

// Remove Work Experience
function removeWorkExperience(index) {
  const entry = document.querySelector(`.experience-entry[data-index="${index}"]`);
  if (entry) {
    entry.remove();
    updateEntryNumbers('.experience-entry', 'Experience');
    
    // Hide remove button if only one entry left
    const entries = document.querySelectorAll('.experience-entry');
    if (entries.length === 1) {
      entries[0].querySelector('.remove-entry-btn').style.display = 'none';
    }
  }
}

// Add Education
function addEducation() {
  const container = document.getElementById('educationContainer');
  const newIndex = educationCount;
  
  // Show remove button on first entry
  if (educationCount === 1) {
    document.querySelector('.education-entry[data-index="0"] .remove-entry-btn').style.display = 'flex';
  }
  
  const html = `
    <div class="education-entry" data-index="${newIndex}">
      <div class="entry-header">
        <span class="entry-number">Education #${newIndex + 1}</span>
        <button type="button" class="remove-entry-btn" onclick="removeEducation(${newIndex})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Degree / Certificate <span class="required-star">*</span></label>
          <input type="text" name="eduDegree_${newIndex}" required placeholder="e.g., Bachelor of Science in Computer Science">
        </div>
        
        <div class="form-group">
          <label>Institution Name <span class="required-star">*</span></label>
          <input type="text" name="eduInstitution_${newIndex}" required placeholder="e.g., University of Dhaka">
        </div>
        
        <div class="form-group">
          <label>Location</label>
          <input type="text" name="eduLocation_${newIndex}" placeholder="e.g., Dhaka, Bangladesh">
        </div>
        
        <div class="form-group">
          <label>GPA / Grade (optional)</label>
          <input type="text" name="eduGrade_${newIndex}" placeholder="e.g., 3.8 / 4.0">
        </div>
        
        <div class="form-group">
          <label>Start Year</label>
          <input type="number" name="eduStartYear_${newIndex}" min="1950" max="2030" placeholder="e.g., 2018">
        </div>
        
        <div class="form-group">
          <label>End Year (or Expected)</label>
          <input type="number" name="eduEndYear_${newIndex}" min="1950" max="2030" placeholder="e.g., 2022">
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  educationCount++;
}

// Remove Education
function removeEducation(index) {
  const entry = document.querySelector(`.education-entry[data-index="${index}"]`);
  if (entry) {
    entry.remove();
    updateEntryNumbers('.education-entry', 'Education');
    
    const entries = document.querySelectorAll('.education-entry');
    if (entries.length === 1) {
      entries[0].querySelector('.remove-entry-btn').style.display = 'none';
    }
  }
}

// Add Certification
function addCertification() {
  const container = document.getElementById('certificationsContainer');
  const newIndex = certificationCount;
  
  // Show remove button on first entry
  if (certificationCount === 1) {
    document.querySelector('.certification-entry[data-index="0"] .remove-entry-btn').style.display = 'flex';
  }
  
  const html = `
    <div class="certification-entry" data-index="${newIndex}">
      <div class="entry-header">
        <span class="entry-number">Certification #${newIndex + 1}</span>
        <button type="button" class="remove-entry-btn" onclick="removeCertification(${newIndex})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Certification Name</label>
          <input type="text" name="certName_${newIndex}" placeholder="e.g., AWS Solutions Architect">
        </div>
        
        <div class="form-group">
          <label>Issuing Organization</label>
          <input type="text" name="certOrg_${newIndex}" placeholder="e.g., Amazon Web Services">
        </div>
        
        <div class="form-group">
          <label>Issue Date</label>
          <input type="month" name="certDate_${newIndex}">
        </div>
        
        <div class="form-group">
          <label>Credential ID (optional)</label>
          <input type="text" name="certId_${newIndex}" placeholder="e.g., ABC123XYZ">
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  certificationCount++;
}

// Remove Certification
function removeCertification(index) {
  const entry = document.querySelector(`.certification-entry[data-index="${index}"]`);
  if (entry) {
    entry.remove();
    updateEntryNumbers('.certification-entry', 'Certification');
    
    const entries = document.querySelectorAll('.certification-entry');
    if (entries.length === 1) {
      entries[0].querySelector('.remove-entry-btn').style.display = 'none';
    }
  }
}

// Add Reference
function addReference() {
  const container = document.getElementById('referencesContainer');
  const newIndex = referenceCount;
  
  // Show remove button on first entry
  if (referenceCount === 1) {
    document.querySelector('.reference-entry[data-index="0"] .remove-entry-btn').style.display = 'flex';
  }
  
  const html = `
    <div class="reference-entry" data-index="${newIndex}">
      <div class="entry-header">
        <span class="entry-number">Reference #${newIndex + 1}</span>
        <button type="button" class="remove-entry-btn" onclick="removeReference(${newIndex})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Reference Name</label>
          <input type="text" name="refName_${newIndex}" placeholder="e.g., Dr. Jane Smith">
        </div>
        
        <div class="form-group">
          <label>Job Title / Relationship</label>
          <input type="text" name="refTitle_${newIndex}" placeholder="e.g., Senior Manager at Tech Corp">
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" name="refEmail_${newIndex}" placeholder="e.g., jane.smith@techcorp.com">
        </div>
        
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" name="refPhone_${newIndex}" placeholder="e.g., +880 1234 567890">
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  referenceCount++;
}

// Remove Reference
function removeReference(index) {
  const entry = document.querySelector(`.reference-entry[data-index="${index}"]`);
  if (entry) {
    entry.remove();
    updateEntryNumbers('.reference-entry', 'Reference');
    
    const entries = document.querySelectorAll('.reference-entry');
    if (entries.length === 1) {
      entries[0].querySelector('.remove-entry-btn').style.display = 'none';
    }
  }
}

// Update entry numbers after removal
function updateEntryNumbers(selector, prefix) {
  const entries = document.querySelectorAll(selector);
  entries.forEach((entry, index) => {
    const numberSpan = entry.querySelector('.entry-number');
    if (numberSpan) {
      numberSpan.textContent = `${prefix} #${index + 1}`;
    }
  });
}

// Toggle CV upload section
function toggleCVUpload(show) {
  const uploadSection = document.getElementById('cvUploadSection');
  if (uploadSection) {
    uploadSection.style.display = show ? 'block' : 'none';
  }
}

// Setup file uploads
function setupFileUploads() {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    input.addEventListener('change', function() {
      const wrapper = this.closest('.file-upload-wrapper');
      const display = wrapper.querySelector('.file-upload-display span:first-of-type');
      
      if (this.files && this.files[0]) {
        display.textContent = this.files[0].name;
        wrapper.classList.add('has-file');
      } else {
        display.textContent = 'Click to upload or drag and drop';
        wrapper.classList.remove('has-file');
      }
    });
  });
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Show success modal
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // In a real application, you would send the form data to a server here
  // For now, we just show the success modal
}

// Close modal
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Redirect to home
  window.location.href = 'index.html';
}
